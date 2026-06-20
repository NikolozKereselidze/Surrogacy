import { PrismaClient } from "../../prisma/generated/client.js";
import { CreateDonorProfileInput } from "../schemas/donorProfileSchema.js";
import { deleteFileFromS3 } from "./s3Service.js";

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

async function deleteS3Keys(keys: string[]): Promise<void> {
  for (const key of keys) {
    try {
      await deleteFileFromS3(key);
    } catch (error) {
      console.error(`Failed to delete S3 object ${key}:`, error);
    }
  }
}

async function createDonorRecord(
  tx: TransactionClient,
  donorModel: DonorModel,
  databaseUserId: string,
) {
  switch (donorModel) {
    case "eggDonor":
      return tx.eggDonor.create({
        data: { databaseUserId },
        include: donorInclude,
      });
    case "spermDonor":
      return tx.spermDonor.create({
        data: { databaseUserId },
        include: donorInclude,
      });
    case "surrogate":
      return tx.surrogate.create({
        data: { databaseUserId },
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

    return createDonorRecord(tx, donorModel, databaseUser.id);
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

  await deleteS3Keys(s3Keys);

  return donor;
}

export async function syncSecondaryImages(
  prisma: PrismaClient,
  databaseUserId: string,
  secondaryImages: string[],
): Promise<void> {
  const existing = await prisma.donorImage.findMany({
    where: { databaseUserId, isMain: false },
    select: { imagePath: true },
  });

  const existingPaths = existing.map((image) => image.imagePath);
  const removedPaths = existingPaths.filter(
    (path) => !secondaryImages.includes(path),
  );

  await prisma.$transaction(async (tx) => {
    await tx.donorImage.deleteMany({
      where: { databaseUserId, isMain: false },
    });

    if (secondaryImages.length > 0) {
      await tx.donorImage.createMany({
        data: secondaryImages.map((imagePath) => ({
          databaseUserId,
          imagePath,
          isMain: false,
        })),
      });
    }
  });

  await deleteS3Keys(removedPaths);
}
