import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEggDonors = async (req: Request, res: Response) => {
  try {
    const eggDonors = await prisma.eggDonor.findMany({
      include: {
        databaseUser: true,
      },
    });
    res.json(eggDonors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch egg donors" });
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

const createEggDonor = async (req: Request, res: Response) => {
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

    // Then create the egg donor linked to the user
    const eggDonor = await prisma.eggDonor.create({
      data: {
        databaseUserId: databaseUser.id,
      },
      include: {
        databaseUser: true,
      },
    });

    res.json(eggDonor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create egg donor" });
  }
};

const updateEggDonor = async (req: Request, res: Response): Promise<any> => {
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
    // Get the egg donor to find the associated user
    const eggDonor = await prisma.eggDonor.findUnique({
      where: { id },
      include: { databaseUser: true },
    });

    if (!eggDonor) {
      return res.status(404).json({ error: "Egg donor not found" });
    }

    // Update the database user
    await prisma.databaseUser.update({
      where: { id: eggDonor.databaseUserId },
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

    // Return the updated egg donor with user data
    const updatedEggDonor = await prisma.eggDonor.findUnique({
      where: { id },
      include: { databaseUser: true },
    });

    res.json(updatedEggDonor);
  } catch (error) {
    res.status(404).json({ error: "Egg donor not found" });
  }
};

const deleteEggDonor = async (req: Request, res: Response): Promise<any> => {
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
  } catch (error) {
    res.status(404).json({ error: "Egg donor not found" });
  }
};

export default {
  getEggDonors,
  getEggDonorsCount,
  createEggDonor,
  updateEggDonor,
  deleteEggDonor,
};
