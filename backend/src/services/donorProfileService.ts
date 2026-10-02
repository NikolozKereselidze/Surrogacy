import type { PrismaClient } from "../../prisma/generated/client.js";
import { CreateDonorProfileInput, UpdateDonorProfileInput } from "../schemas/donorProfileSchema.js";
import { deleteFileFromS3 } from "./s3Service.js";
import { logEvent } from "../lib/logger.js";

export type DonorModel = "eggDonor" | "spermDonor" | "surrogate";

const donorInclude = {
  databaseUser: {
    include: {
      donorImages: true,
    },
  },
} as const;

type TransactionClient = Parameters<
  Parameters<PrismaClient["$transaction"]>[0]
>[0];

function collectS3Keys(databaseUser: {
  mainImagePath: string | null;
  documentPath: string | null;
  donorImages: { imagePath: string }[];
}): string[] {
  const keys: string[] = [];

  if (databaseUser.mainImagePath) {
    keys.push(databaseUser.mainImagePath);
  }
  if (databaseUser.documentPath) {
    keys.push(databaseUser.documentPath);
  }
  for (const image of databaseUser.donorImages) {
    keys.push(image.imagePath);
  }

  return keys;
}

async function deleteS3Keys(keys: string[], donorModel: DonorModel, profileId: string): Promise<void> {
  for (const key of keys) {
    try {
      await deleteFileFromS3(key);
    } catch {
      logEvent("error", "storage.cleanup_failed", { resource: donorModel, profileId, reason: "delete_failed" });
    }
  }
}

async function createDonorRecord(
  tx: TransactionClient,
  donorModel: DonorModel,
  databaseUserId: string,
  donorId?: string,
) {
  switch (donorModel) {
    case "eggDonor":
      return tx.eggDonor.create({
        data: { id: donorId, databaseUserId },
        include: donorInclude,
      });
    case "spermDonor":
      return tx.spermDonor.create({
        data: { id: donorId, databaseUserId },
        include: donorInclude,
      });
    case "surrogate":
      return tx.surrogate.create({
        data: { id: donorId, databaseUserId },
        include: donorInclude,
      });
  }
}

async function deleteDonorRecord(
  tx: TransactionClient,
  donorModel: DonorModel,
  id: string,
  databaseUserId: string,
): Promise<void> {
  switch (donorModel) {
    case "eggDonor":
      await tx.eggDonor.delete({ where: { id } });
      break;
    case "spermDonor":
      await tx.spermDonor.delete({ where: { id } });
      break;
    case "surrogate":
      await tx.surrogate.delete({ where: { id } });
      break;
  }

  await tx.databaseUser.delete({ where: { id: databaseUserId } });
}

export async function createDonorWithProfile(
  prisma: PrismaClient,
  donorModel: DonorModel,
  data: CreateDonorProfileInput,
) {
  const {
    height,
    weight,
    age,
    available,
    hairColor,
    eyeColor,
    relationshipStatus,
    livingSituation,
    children,
    documentPath,
    mainImagePath,
    secondaryImages,
    profileId,
  } = data;

  return prisma.$transaction(async (tx) => {
    const databaseUser = await tx.databaseUser.create({
      data: {
        height,
        weight,
        age,
        available,
        hairColor,
        eyeColor,
        relationshipStatus,
        livingSituation,
        children,
        documentPath,
        mainImagePath,
      },
    });

    if (secondaryImages.length > 0) {
      await tx.donorImage.createMany({
        data: secondaryImages.map((imagePath) => ({
          databaseUserId: databaseUser.id,
          imagePath,
          isMain: false,
        })),
      });
    }

    return createDonorRecord(tx, donorModel, databaseUser.id, profileId);
  });
}

export async function deleteDonorWithProfile(
  prisma: PrismaClient,
  donorModel: DonorModel,
  id: string,
) {
  const donor = await (async () => {
    switch (donorModel) {
      case "eggDonor":
        return prisma.eggDonor.findUnique({
          where: { id },
          include: {
            databaseUser: { include: { donorImages: true } },
          },
        });
      case "spermDonor":
        return prisma.spermDonor.findUnique({
          where: { id },
          include: {
            databaseUser: { include: { donorImages: true } },
          },
        });
      case "surrogate":
        return prisma.surrogate.findUnique({
          where: { id },
          include: {
            databaseUser: { include: { donorImages: true } },
          },
        });
    }
  })();

  if (!donor) {
    return null;
  }

  const s3Keys = collectS3Keys(donor.databaseUser);

  await prisma.$transaction((tx) =>
    deleteDonorRecord(tx, donorModel, id, donor.databaseUserId),
  );

  await deleteS3Keys(s3Keys, donorModel, id);

  return donor;
}

async function findDonorRecord(tx: TransactionClient, donorModel: DonorModel, id: string) {
  switch (donorModel) {
    case "eggDonor":
      return tx.eggDonor.findUnique({ where: { id }, include: donorInclude });
    case "spermDonor":
      return tx.spermDonor.findUnique({ where: { id }, include: donorInclude });
    case "surrogate":
      return tx.surrogate.findUnique({ where: { id }, include: donorInclude });
  }
}

export async function updateDonorWithProfile(
  prisma: PrismaClient,
  donorModel: DonorModel,
  id: string,
  data: UpdateDonorProfileInput,
) {
  const { secondaryImages, ...profileData } = data;
  const result = await prisma.$transaction(async (tx) => {
    const existing = await findDonorRecord(tx, donorModel, id);
    if (!existing) return null;

    await tx.databaseUser.update({
      where: { id: existing.databaseUserId },
      data: profileData,
    });

    if (secondaryImages !== undefined) {
      await tx.donorImage.deleteMany({
        where: { databaseUserId: existing.databaseUserId, isMain: false },
      });
      if (secondaryImages.length > 0) {
        await tx.donorImage.createMany({
          data: secondaryImages.map((imagePath) => ({
            databaseUserId: existing.databaseUserId,
            imagePath,
            isMain: false,
          })),
        });
      }
    }

    const donor = await findDonorRecord(tx, donorModel, id);
    if (!donor) throw new Error("Donor disappeared during update");
    const keptKeys = new Set(collectS3Keys(donor.databaseUser));
    const removedKeys = [...new Set(collectS3Keys(existing.databaseUser))]
      .filter((key) => !keptKeys.has(key));
    return { donor, removedKeys };
  });

  if (!result) return null;
  // A storage cleanup failure must never turn a committed save into a failed save.
  await deleteS3Keys(result.removedKeys, donorModel, id);
  return result.donor;
}
