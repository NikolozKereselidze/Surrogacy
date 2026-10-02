import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import {
  createDonorProfileSchema,
  updateDonorProfileSchema,
  validationErrorResponse,
} from "../schemas/donorProfileSchema.js";
import {
  createDonorWithProfile,
  deleteDonorWithProfile,
  updateDonorWithProfile,
} from "../services/donorProfileService.js";

const getEggDonors = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch egg donors" });
  }
};

const getEggDonorById = async (req: Request, res: Response): Promise<any> => {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch egg donor" });
  }
};

const getEggDonorsCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.eggDonor.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to get egg donors count" });
  }
};

const createEggDonor = async (req: Request, res: Response): Promise<any> => {
  const validationResult = createDonorProfileSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationErrorResponse(validationResult.error));
  }

  try {
    const eggDonor = await createDonorWithProfile(
      prisma,
      "eggDonor",
      validationResult.data,
    );
    res.locals.profileId = eggDonor.id;
    res.json(eggDonor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create egg donor" });
  }
};

const updateEggDonor = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const validationResult = updateDonorProfileSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationErrorResponse(validationResult.error));
  }

  try {
    const donor = await updateDonorWithProfile(prisma, "eggDonor", id, validationResult.data);
    if (!donor) {
      return res.status(404).json({ error: "Egg donor not found" });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ error: "Failed to update egg donor" });
  }
};

const deleteEggDonor = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const deleted = await deleteDonorWithProfile(prisma, "eggDonor", id);

    if (!deleted) {
      return res.status(404).json({ error: "Egg donor not found" });
    }

    res.json({ message: "Egg donor deleted successfully" });
  } catch (error) {
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
