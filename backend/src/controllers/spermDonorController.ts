import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getSpermDonors = async (req: Request, res: Response) => {
  try {
    const spermDonors = await prisma.spermDonor.findMany({
      include: {
        databaseUser: true,
      },
    });
    res.json(spermDonors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sperm donors" });
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
    firstName,
    lastName,
    height,
    weight,
    age,
    available,
    documentPath,
    imagePath,
  } = req.body;

  try {
    // First create the database user
    const databaseUser = await prisma.databaseUser.create({
      data: {
        firstName,
        lastName,
        height,
        weight,
        age,
        available: available || true,
        documentPath,
        imagePath,
      },
    });

    // Then create the sperm donor linked to the user
    const spermDonor = await prisma.spermDonor.create({
      data: {
        databaseUserId: databaseUser.id,
      },
      include: {
        databaseUser: true,
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
    firstName,
    lastName,
    height,
    weight,
    age,
    available,
    documentPath,
    imagePath,
  } = req.body;

  try {
    // Get the sperm donor to find the associated user
    const spermDonor = await prisma.spermDonor.findUnique({
      where: { id },
      include: { databaseUser: true },
    });

    if (!spermDonor) {
      return res.status(404).json({ error: "Sperm donor not found" });
    }

    // Update the database user
    const updatedUser = await prisma.databaseUser.update({
      where: { id: spermDonor.databaseUserId },
      data: {
        firstName,
        lastName,
        height,
        weight,
        age,
        available,
        documentPath,
        imagePath,
      },
    });

    // Return the updated sperm donor with user data
    const updatedSpermDonor = await prisma.spermDonor.findUnique({
      where: { id },
      include: { databaseUser: true },
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
  getSpermDonorsCount,
  createSpermDonor,
  updateSpermDonor,
  deleteSpermDonor,
};
