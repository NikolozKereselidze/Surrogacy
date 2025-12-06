import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

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

const createSurrogate = async (req: Request, res: Response) => {
  const {
    height,
    weight,
    age,
    available,
    documentPath,
    mainImagePath,
    secondaryImages,
  } = req.body;

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
        data: secondaryImages.map((imagePath: string) => ({
          databaseUserId: databaseUser.id,
          imagePath,
          isMain: false,
        })),
      });
    }

    // Then create the surrogate linked to the user
    const surrogate = await prisma.surrogate.create({
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

    res.json(surrogate);
  } catch (error) {
    res.status(500).json({ error: "Failed to create surrogate" });
  }
};

const updateSurrogate = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const {
    height,
    weight,
    age,
    available,
    documentPath,
    mainImagePath,
    secondaryImages,
  } = req.body;

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
          databaseUserId: surrogate.databaseUserId,
          isMain: false,
        },
      });

      // Create new secondary images if provided

      await prisma.donorImage.createMany({
        data: secondaryImages.map((imagePath: string) => ({
          databaseUserId: surrogate.databaseUserId,
          imagePath,
          isMain: false,
        })),
      });
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
    res.status(404).json({ error: "Surrogate not found" });
  }
};

const deleteSurrogate = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    // Get the surrogate to find the associated user
    const surrogate = await prisma.surrogate.findUnique({
      where: { id },
      include: { databaseUser: true },
    });

    if (!surrogate) {
      return res.status(404).json({ error: "Surrogate not found" });
    }

    // Delete the surrogate first
    await prisma.surrogate.delete({
      where: { id },
    });

    // Then delete the associated user
    await prisma.databaseUser.delete({
      where: { id: surrogate.databaseUserId },
    });

    res.json({ message: "Surrogate deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Surrogate not found" });
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
