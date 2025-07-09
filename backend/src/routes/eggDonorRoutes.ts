import express from "express";
import eggDonorController from "../controllers/eggDonorController";

const router = express.Router();

router.get("/", eggDonorController.getEggDonors);
router.get("/count", eggDonorController.getEggDonorsCount);
router.post("/", eggDonorController.createEggDonor);
router.put("/:id", eggDonorController.updateEggDonor);
router.delete("/:id", eggDonorController.deleteEggDonor);

export default router;
