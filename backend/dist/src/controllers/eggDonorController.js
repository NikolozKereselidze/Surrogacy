import { PrismaClient } from "../../prisma/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const getEggDonors = async (req, res) => {
    try {
        const eggDonors = await prisma.eggDonor.findMany({
            include: {
                databaseUser: {
                    include: {
                        donorImages: true,
                    },
                },
            },
        });
        res.json(eggDonors);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch egg donors" });
    }
};
const getEggDonorById = async (req, res) => {
    try {
        const { id } = req.params;
        const eggDonor = await prisma.eggDonor.findUnique({
            where: { id },
            include: {
                databaseUser: {
                    include: {
                        donorImages: true,
                    },
                },
            },
        });
        if (!eggDonor) {
            return res.status(404).json({ error: "Egg donor not found" });
        }
        res.json(eggDonor);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch egg donor" });
    }
};
const getEggDonorsCount = async (req, res) => {
    try {
        const count = await prisma.eggDonor.count();
        res.json({ count });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get egg donors count" });
    }
};
const createEggDonor = async (req, res) => {
    const { height, weight, age, available, documentPath, mainImagePath, secondaryImages, } = req.body;
    try {
        // First create the database user
        const databaseUser = await prisma.databaseUser.create({
            data: {
                height,
                weight,
                age,
                available: available || true,
                documentPath,
                mainImagePath,
            },
        });
        // Create secondary images if provided
        if (secondaryImages && secondaryImages.length > 0) {
            await prisma.donorImage.createMany({
                data: secondaryImages.map((imagePath) => ({
                    databaseUserId: databaseUser.id,
                    imagePath,
                    isMain: false,
                })),
            });
        }
        // Then create the egg donor linked to the user
        const eggDonor = await prisma.eggDonor.create({
            data: {
                databaseUserId: databaseUser.id,
            },
            include: {
                databaseUser: {
                    include: {
                        donorImages: true,
                    },
                },
            },
        });
        res.json(eggDonor);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create egg donor" });
    }
};
const updateEggDonor = async (req, res) => {
    const { id } = req.params;
    const { height, weight, age, available, documentPath, mainImagePath, secondaryImages, } = req.body;
    try {
        // Get the egg donor to find the associated user
        const eggDonor = await prisma.eggDonor.findUnique({
            where: { id },
            include: {
                databaseUser: {
                    include: {
                        donorImages: true,
                    },
                },
            },
        });
        if (!eggDonor) {
            return res.status(404).json({ error: "Egg donor not found" });
        }
        // Update the database user
        await prisma.databaseUser.update({
            where: { id: eggDonor.databaseUserId },
            data: {
                height,
                weight,
                age,
                available,
                documentPath,
                mainImagePath,
            },
        });
        // Handle secondary images
        if (secondaryImages && secondaryImages.length > 0) {
            // Delete existing secondary images
            await prisma.donorImage.deleteMany({
                where: {
                    databaseUserId: eggDonor.databaseUserId,
                    isMain: false,
                },
            });
            // Create new secondary images if provided
            await prisma.donorImage.createMany({
                data: secondaryImages.map((imagePath) => ({
                    databaseUserId: eggDonor.databaseUserId,
                    imagePath,
                    isMain: false,
                })),
            });
        }
        // Return the updated egg donor with user data
        const updatedEggDonor = await prisma.eggDonor.findUnique({
            where: { id },
            include: {
                databaseUser: {
                    include: {
                        donorImages: true,
                    },
                },
            },
        });
        res.json(updatedEggDonor);
    }
    catch (error) {
        res.status(404).json({ error: "Egg donor not found" });
    }
};
const deleteEggDonor = async (req, res) => {
    const { id } = req.params;
    try {
        // Get the egg donor to find the associated user
        const eggDonor = await prisma.eggDonor.findUnique({
            where: { id },
            include: { databaseUser: true },
        });
        if (!eggDonor) {
            return res.status(404).json({ error: "Egg donor not found" });
        }
        // Delete the egg donor first
        await prisma.eggDonor.delete({
            where: { id },
        });
        // Then delete the associated user
        await prisma.databaseUser.delete({
            where: { id: eggDonor.databaseUserId },
        });
        res.json({ message: "Egg donor deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ error: "Egg donor not found" });
    }
};
export default {
    getEggDonors,
    getEggDonorById,
    getEggDonorsCount,
    createEggDonor,
    updateEggDonor,
    deleteEggDonor,
};
