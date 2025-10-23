import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

const createSpermDonor = async (req: Request, res: Response) => {
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

    // Then create the sperm donor linked to the user
    const spermDonor = await prisma.spermDonor.create({
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

    res.json(spermDonor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create sperm donor" });
  }
};

const updateSpermDonor = async (req: Request, res: Response): Promise<any> => {
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
          databaseUserId: spermDonor.databaseUserId,
          isMain: false,
        },
      });

      // Create new secondary images if provided

      await prisma.donorImage.createMany({
        data: secondaryImages.map((imagePath: string) => ({
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
  } catch (error) {
    res.status(404).json({ error: "Sperm donor not found" });
  }
};

const deleteSpermDonor = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    // Get the sperm donor to find the associated user
    const spermDonor = await prisma.spermDonor.findUnique({
      where: { id },
      include: { databaseUser: true },
    });

    if (!spermDonor) {
      return res.status(404).json({ error: "Sperm donor not found" });
    }

    // Delete the sperm donor first
    await prisma.spermDonor.delete({
      where: { id },
    });

    // Then delete the associated user
    await prisma.databaseUser.delete({
      where: { id: spermDonor.databaseUserId },
    });

    res.json({ message: "Sperm donor deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Sperm donor not found" });
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
