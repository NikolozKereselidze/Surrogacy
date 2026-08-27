import express from "express";
import teamMemberController from "../controllers/teamMemberController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", teamMemberController.getPublicTeamMembers);
router.get("/admin", requireAdmin, teamMemberController.getAdminTeamMembers);
router.post("/admin", requireAdmin, teamMemberController.createTeamMember);
router.put("/admin/:id", requireAdmin, teamMemberController.updateTeamMember);
router.delete("/admin/:id", requireAdmin, teamMemberController.deleteTeamMember);
router.get("/:slug", teamMemberController.getPublicTeamMember);

export default router;
