import { Router, Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    hasDonorAccess?: boolean;
  }
}

const router = Router();

router.get("/check", (req, res) => {
  if (req.session.hasDonorAccess) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

router.post("/login", (req: Request, res: Response) => {
  // If user is already authenticated, return success
  if (req.session.hasDonorAccess) {
    res.sendStatus(200);
    return;
  }

  const { password } = req.body;
  if (password === process.env.DONOR_ACCESS_PASSWORD) {
    req.session.hasDonorAccess = true;
    res.sendStatus(200);
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default router;
