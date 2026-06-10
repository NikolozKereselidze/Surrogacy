import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

type TokenPayload = string | jwt.JwtPayload;

function verifyToken(
  token: string | undefined,
  secret: string | undefined,
): TokenPayload | null {
  if (!token || !secret) {
    return null;
  }

  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export const requireAdmin: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const adminToken = req.cookies?.adminToken as string | undefined;
  const decoded = verifyToken(adminToken, process.env.ADMIN_JWT_SECRET);

  if (!decoded) {
    res.status(401).json({ message: "Admin authorization required" });
    return;
  }

  next();
};

export const requireAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const adminToken = req.cookies?.adminToken as string | undefined;
  const donorToken = req.cookies?.donorToken as string | undefined;

  const isAdmin = Boolean(
    verifyToken(adminToken, process.env.ADMIN_JWT_SECRET),
  );
  const isDonor = Boolean(
    verifyToken(donorToken, process.env.DONOR_JWT_SECRET),
  );

  if (!isAdmin && !isDonor) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  next();
};
