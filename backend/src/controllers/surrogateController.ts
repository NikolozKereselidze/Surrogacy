import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  createDonorProfileSchema,
  updateDonorProfileSchema,
  validationErrorResponse,
} from "../schemas/donorProfileSchema.js";
import {
  createDonorWithProfile,
  deleteDonorWithProfile,
  syncSecondaryImages,
} from "../services/donorProfileService.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

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
    res.json(surrogate);
  } catch (error) {
    console.error("Failed to create surrogate:", error);
    res.status(500).json({ error: "Failed to create surrogate" });
  }
};

const updateSurrogate = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const validationResult = updateDonorProfileSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationErrorResponse(validationResult.error));
  }

  const { secondaryImages, ...profileData } = validationResult.data;

  try {
    // Get the surrogate to find the associated user
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

    // Update the database user
    await prisma.databaseUser.update({
      where: { id: surrogate.databaseUserId },
      data: profileData,
    });

    if (secondaryImages !== undefined) {
      await syncSecondaryImages(
        prisma,
        surrogate.databaseUserId,
        secondaryImages,
      );
    }

    // Return the updated surrogate with user data
    const updatedSurrogate = await prisma.surrogate.findUnique({
      where: { id },
      include: {
        databaseUser: {
          include: {
            donorImages: true,
          },
        },
      },
    });

    res.json(updatedSurrogate);
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
    console.error("Failed to delete surrogate:", error);
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
