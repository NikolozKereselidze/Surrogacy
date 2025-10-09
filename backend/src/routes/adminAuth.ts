import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

// Rate limiting for admin login attempts
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // More restrictive for admin - only 3 attempts per windowMs
  message: "Too many admin login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Extend Request interface to include admin user
declare global {
  namespace Express {
    interface Request {
      adminUser?: {
        hasAdminAccess: boolean;
        iat: number;
        exp: number;
      };
    }
  }
}

const router = Router();

// Middleware to verify admin JWT token
const verifyAdminToken = (req: Request, res: Response, next: any): void => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies?.adminToken;

  if (!token) {
    res.status(403).json({ error: "No admin token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.adminUser = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid admin token" });
    return;
  }
};

router.get("/check", verifyAdminToken, (req, res) => {
  if (req.adminUser?.hasAdminAccess) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

router.post(
  "/login",
  adminLoginLimiter,
  (req: Request, res: Response): void => {
    const { password } = req.body;

    if (!password) {
      res.status(400).json({ error: "Password is required" });
      return;
    }

    if (password === process.env.ADMIN_ACCESS_PASSWORD) {
      // Create admin JWT token
      const token = jwt.sign(
        { hasAdminAccess: true },
        process.env.JWT_SECRET!,
        {
          expiresIn: "3h", // Shorter expiration for admin tokens
        }
      );

      // Set secure HTTP-only cookie
      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
      });

      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: "Invalid admin password" });
    }
  }
);

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("adminToken");
  res.json({ success: true });
});

export default router;
