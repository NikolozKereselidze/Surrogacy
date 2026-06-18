import { deleteFileFromS3 } from "./s3Service.js";
const donorInclude = {
    databaseUser: {
        include: {
            donorImages: true,
        },
    },
};
function collectS3Keys(databaseUser) {
    const keys = [];
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
async function deleteS3Keys(keys) {
    for (const key of keys) {
        try {
            await deleteFileFromS3(key);
        }
        catch (error) {
            console.error(`Failed to delete S3 object ${key}:`, error);
        }
    }
}
async function createDonorRecord(tx, donorModel, databaseUserId) {
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
async function deleteDonorRecord(tx, donorModel, id, databaseUserId) {
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
export async function createDonorWithProfile(prisma, donorModel, data) {
    const { height, weight, age, available, hairColor, eyeColor, relationshipStatus, livingSituation, children, documentPath, mainImagePath, secondaryImages, } = data;
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
export async function deleteDonorWithProfile(prisma, donorModel, id) {
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
    await prisma.$transaction((tx) => deleteDonorRecord(tx, donorModel, id, donor.databaseUserId));
    await deleteS3Keys(s3Keys);
    return donor;
}
