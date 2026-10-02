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

const getSurrogates = async (req: Request, res: Response) => {
  try {
    const surrogates = await prisma.surrogate.findMany({
      include: {
        databaseUser: {
          include: {
            donorImages: true,
          },
        },
      },
    });
    res.json(surrogates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch surrogates" });
  }
};

const getSurrogateById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const surrogate = await prisma.surrogate.findUnique({
      where: { id },
      include: {
        databaseUser: {
          include: {
            donorImages: true,
          },
        },
      },
    });
    if (!surrogate) {
      return res.status(404).json({ error: "Surrogate not found" });
    }
    res.json(surrogate);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch surrogate" });
  }
};

const getSurrogatesCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.surrogate.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to get surrogates count" });
  }
};

const createSurrogate = async (req: Request, res: Response): Promise<any> => {
  const validationResult = createDonorProfileSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationErrorResponse(validationResult.error));
  }

  try {
    const surrogate = await createDonorWithProfile(
      prisma,
      "surrogate",
      validationResult.data,
    );
    res.locals.profileId = surrogate.id;
    res.json(surrogate);
  } catch (error) {
    res.status(500).json({ error: "Failed to create surrogate" });
  }
};

const updateSurrogate = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const validationResult = updateDonorProfileSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationErrorResponse(validationResult.error));
  }

  try {
    const donor = await updateDonorWithProfile(prisma, "surrogate", id, validationResult.data);
    if (!donor) {
      return res.status(404).json({ error: "Surrogate not found" });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ error: "Failed to update surrogate" });
  }
};

const deleteSurrogate = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const deleted = await deleteDonorWithProfile(prisma, "surrogate", id);

    if (!deleted) {
      return res.status(404).json({ error: "Surrogate not found" });
    }

    res.json({ message: "Surrogate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete surrogate" });
  }
};

export default {
  getSurrogates,
  getSurrogateById,
  getSurrogatesCount,
  createSurrogate,
  updateSurrogate,
  deleteSurrogate,
};
