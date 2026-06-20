import { PrismaClient } from "../../prisma/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { createDonorProfileSchema, updateDonorProfileSchema, validationErrorResponse, } from "../schemas/donorProfileSchema.js";
import { createDonorWithProfile, deleteDonorWithProfile, syncSecondaryImages, } from "../services/donorProfileService.js";
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
    const validationResult = createDonorProfileSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json(validationErrorResponse(validationResult.error));
    }
    try {
        const eggDonor = await createDonorWithProfile(prisma, "eggDonor", validationResult.data);
        res.json(eggDonor);
    }
    catch (error) {
        console.error("Failed to create egg donor:", error);
        res.status(500).json({ error: "Failed to create egg donor" });
    }
};
const updateEggDonor = async (req, res) => {
    const { id } = req.params;
    const validationResult = updateDonorProfileSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json(validationErrorResponse(validationResult.error));
    }
    const { secondaryImages, ...profileData } = validationResult.data;
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
            data: profileData,
        });
        // Sync secondary images when the client sends the final desired list
        if (secondaryImages !== undefined) {
            await syncSecondaryImages(prisma, eggDonor.databaseUserId, secondaryImages);
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
        res.status(500).json({ error: "Failed to update egg donor" });
    }
};
const deleteEggDonor = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteDonorWithProfile(prisma, "eggDonor", id);
        if (!deleted) {
            return res.status(404).json({ error: "Egg donor not found" });
        }
        res.json({ message: "Egg donor deleted successfully" });
    }
    catch (error) {
        console.error("Failed to delete egg donor:", error);
        res.status(500).json({ error: "Failed to delete egg donor" });
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
