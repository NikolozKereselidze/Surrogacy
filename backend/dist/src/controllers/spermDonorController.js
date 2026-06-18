import { PrismaClient } from "../../prisma/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { createDonorProfileSchema, updateDonorProfileSchema, validationErrorResponse, } from "../schemas/donorProfileSchema.js";
import { createDonorWithProfile, deleteDonorWithProfile, } from "../services/donorProfileService.js";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const getSpermDonors = async (req, res) => {
    try {
        const spermDonors = await prisma.spermDonor.findMany({
            include: {
                databaseUser: {
                    include: {
                        donorImages: true,
                    },
                },
            },
        });
        res.json(spermDonors);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch sperm donors" });
    }
};
const getSpermDonorById = async (req, res) => {
    try {
        const { id } = req.params;
        const spermDonor = await prisma.spermDonor.findUnique({
            where: { id },
            include: {
                databaseUser: {
                    include: {
                        donorImages: true,
                    },
                },
            },
        });
        if (!spermDonor) {
            return res.status(404).json({ error: "Sperm donor not found" });
        }
        res.json(spermDonor);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch sperm donor" });
    }
};
const getSpermDonorsCount = async (req, res) => {
    try {
        const count = await prisma.spermDonor.count();
        res.json({ count });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get sperm donors count" });
    }
};
const createSpermDonor = async (req, res) => {
    const validationResult = createDonorProfileSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json(validationErrorResponse(validationResult.error));
    }
    try {
        const spermDonor = await createDonorWithProfile(prisma, "spermDonor", validationResult.data);
        res.json(spermDonor);
    }
    catch (error) {
        console.error("Failed to create sperm donor:", error);
        res.status(500).json({ error: "Failed to create sperm donor" });
    }
};
const updateSpermDonor = async (req, res) => {
    const { id } = req.params;
    const validationResult = updateDonorProfileSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json(validationErrorResponse(validationResult.error));
    }
    const { secondaryImages, ...profileData } = validationResult.data;
    try {
        // Get the sperm donor to find the associated user
        const spermDonor = await prisma.spermDonor.findUnique({
            where: { id },
            include: {
                databaseUser: {
                    include: {
                        donorImages: true,
                    },
                },
            },
        });
        if (!spermDonor) {
            return res.status(404).json({ error: "Sperm donor not found" });
        }
        // Update the database user
        await prisma.databaseUser.update({
            where: { id: spermDonor.databaseUserId },
            data: profileData,
        });
        // Handle secondary images
        if (secondaryImages && secondaryImages.length > 0) {
            // Delete existing secondary images
            await prisma.donorImage.deleteMany({
                where: {
                    databaseUserId: spermDonor.databaseUserId,
                    isMain: false,
                },
            });
            // Create new secondary images if provided
            await prisma.donorImage.createMany({
                data: secondaryImages.map((imagePath) => ({
                    databaseUserId: spermDonor.databaseUserId,
                    imagePath,
                    isMain: false,
                })),
            });
        }
        // Return the updated sperm donor with user data
        const updatedSpermDonor = await prisma.spermDonor.findUnique({
            where: { id },
            include: {
                databaseUser: {
                    include: {
                        donorImages: true,
                    },
                },
            },
        });
        res.json(updatedSpermDonor);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update sperm donor" });
    }
};
const deleteSpermDonor = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteDonorWithProfile(prisma, "spermDonor", id);
        if (!deleted) {
            return res.status(404).json({ error: "Sperm donor not found" });
        }
        res.json({ message: "Sperm donor deleted successfully" });
    }
    catch (error) {
        console.error("Failed to delete sperm donor:", error);
        res.status(500).json({ error: "Failed to delete sperm donor" });
    }
};
export default {
    getSpermDonors,
    getSpermDonorById,
    getSpermDonorsCount,
    createSpermDonor,
    updateSpermDonor,
    deleteSpermDonor,
};
