import express, { Request, Response } from "express";
import surrogateController from "../controllers/surrogateController.js";
import { requireAdmin, requireAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuthenticated, surrogateController.getSurrogates);
router.get("/count", requireAuthenticated, surrogateController.getSurrogatesCount);
router.post("/", requireAdmin, surrogateController.createSurrogate);
router.get("/:id", requireAuthenticated, surrogateController.getSurrogateById);
router.put("/:id", requireAdmin, surrogateController.updateSurrogate);
router.delete("/:id", requireAdmin, surrogateController.deleteSurrogate);

export default router;
