import { Router } from "express";

const router = Router();

declare module "express-session" {
  interface SessionData {
    hasAdminAccess?: boolean;
  }
}

router.get("/check", (req, res) => {
  if (req.session.hasAdminAccess) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

router.post("/login", (req, res) => {
  if (req.session.hasAdminAccess) {
    res.sendStatus(200);
    return;
  }

  const { password } = req.body;

  if (password === process.env.ADMIN_ACCESS_PASSWORD) {
    req.session.hasAdminAccess = true;
    res.sendStatus(200);
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default router;
