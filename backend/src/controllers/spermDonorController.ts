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

const getSpermDonors = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sperm donors" });
  }
};

const getSpermDonorById = async (req: Request, res: Response): Promise<any> => {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sperm donor" });
  }
};

const getSpermDonorsCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.spermDonor.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to get sperm donors count" });
  }
};

const createSpermDonor = async (req: Request, res: Response): Promise<any> => {
  const validationResult = createDonorProfileSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationErrorResponse(validationResult.error));
  }

  try {
    const spermDonor = await createDonorWithProfile(
      prisma,
      "spermDonor",
      validationResult.data,
    );
    res.locals.profileId = spermDonor.id;
    res.json(spermDonor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create sperm donor" });
  }
};

const updateSpermDonor = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const validationResult = updateDonorProfileSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationErrorResponse(validationResult.error));
  }

  try {
    const donor = await updateDonorWithProfile(prisma, "spermDonor", id, validationResult.data);
    if (!donor) {
      return res.status(404).json({ error: "Sperm donor not found" });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ error: "Failed to update sperm donor" });
  }
};

const deleteSpermDonor = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const deleted = await deleteDonorWithProfile(prisma, "spermDonor", id);

    if (!deleted) {
      return res.status(404).json({ error: "Sperm donor not found" });
    }

    res.json({ message: "Sperm donor deleted successfully" });
  } catch (error) {
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
