import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getSurrogates = async (req: Request, res: Response) => {
  try {
    const surrogates = await prisma.surrogate.findMany({
      include: {
        databaseUser: true,
      },
    });
    res.json(surrogates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch surrogates" });
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

    // Then create the surrogate linked to the user
    const surrogate = await prisma.surrogate.create({
      data: {
        databaseUserId: databaseUser.id,
      },
      include: {
        databaseUser: true,
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
    // Get the surrogate to find the associated user
    const surrogate = await prisma.surrogate.findUnique({
      where: { id },
      include: { databaseUser: true },
    });

    if (!surrogate) {
      return res.status(404).json({ error: "Surrogate not found" });
    }

    // Update the database user
    const updatedUser = await prisma.databaseUser.update({
      where: { id: surrogate.databaseUserId },
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

    // Return the updated surrogate with user data
    const updatedSurrogate = await prisma.surrogate.findUnique({
      where: { id },
      include: { databaseUser: true },
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
  getSurrogatesCount,
  createSurrogate,
  updateSurrogate,
  deleteSurrogate,
};
