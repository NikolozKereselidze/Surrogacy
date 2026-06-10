import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/admin/login", authController.adminLogin);
router.post("/donor/login", authController.donorLogin);
router.post("/admin/logout", authController.adminLogout);
router.post("/donor/logout", authController.donorLogout);
router.post("/admin/check-token", authController.adminCheckToken);
router.post("/donor/check-token", authController.donorCheckToken);

export default router;
