import express, { Request, Response } from "express";
import spermDonorController from "../controllers/spermDonorController";

const router = express.Router();

router.get("/", spermDonorController.getSpermDonors);
router.get("/count", spermDonorController.getSpermDonorsCount);
router.post("/", spermDonorController.createSpermDonor);
router.put("/:id", spermDonorController.updateSpermDonor);
router.delete("/:id", spermDonorController.deleteSpermDonor);

export default router;
