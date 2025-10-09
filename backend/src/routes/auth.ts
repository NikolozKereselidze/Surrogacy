import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        hasDonorAccess: boolean;
        iat: number;
        exp: number;
      };
    }
  }
}

const router = Router();

// Middleware to verify JWT token
const verifyToken = (req: Request, res: Response, next: any): void => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies?.donorToken;

  if (!token) {
    res.status(403).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
};

router.get("/check", verifyToken, (req, res) => {
  if (req.user?.hasDonorAccess) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

router.post("/login", loginLimiter, (req: Request, res: Response): void => {
  const { password } = req.body;

  if (!password) {
    res.status(400).json({ error: "Password is required" });
    return;
  }

  if (password === process.env.DONOR_ACCESS_PASSWORD) {
    // Create JWT token
    const token = jwt.sign({ hasDonorAccess: true }, process.env.JWT_SECRET!, {
      expiresIn: "4h",
    });

    // Set secure HTTP-only cookie
    res.cookie("donorToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
    });

    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("donorToken");
  res.json({ success: true });
});

export default router;
