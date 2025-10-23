import express, { Request, Response } from "express";
import surrogateController from "../controllers/surrogateController";

const router = express.Router();

router.get("/", surrogateController.getSurrogates);
router.get("/count", surrogateController.getSurrogatesCount);
router.post("/", surrogateController.createSurrogate);
router.get("/:id", surrogateController.getSurrogateById);
router.put("/:id", surrogateController.updateSurrogate);
router.delete("/:id", surrogateController.deleteSurrogate);

export default router;
