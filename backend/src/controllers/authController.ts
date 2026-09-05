import { Request, Response } from "express";
import jwt from "jsonwebtoken";

function getAuthConfig(role: "ADMIN" | "DONOR") {
  const username = process.env[`${role}_ACCESS_USERNAME`];
  const password = process.env[`${role}_ACCESS_PASSWORD`];
  const secret = process.env[`${role}_JWT_SECRET`];

  if (!username || !password || !secret) {
    return null;
  }

  return { username, password, secret };
}

const donorLogin = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  const config = getAuthConfig("DONOR");

  if (!config) {
    console.error("Donor authentication is not configured");
    return res.status(503).json({ message: "Authentication is unavailable" });
  }

  if (
    username !== config.username ||
    password !== config.password
  ) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, config.secret, {
    expiresIn: "2h",
  });
  res.cookie("donorToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    path: "/",
  });
  return res.status(200).json({ token });
};

const adminLogin = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  const config = getAuthConfig("ADMIN");

  if (!config) {
    console.error("Admin authentication is not configured");
    return res.status(503).json({ message: "Authentication is unavailable" });
  }

  if (
    username !== config.username ||
    password !== config.password
  ) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, config.secret, {
    expiresIn: "2h",
  });
  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    path: "/",
  });
  return res.status(200).json({ token });
};

const adminLogout = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("adminToken");
  return res.status(200).json({ message: "Logout successful" });
};

const donorLogout = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("donorToken");
  return res.status(200).json({ message: "Logout successful" });
};

const adminCheckToken = async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies.adminToken;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!token || !secret) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, secret);
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(200).json({ message: "Token is valid" });
};

const donorCheckToken = async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies.donorToken;
  const secret = process.env.DONOR_JWT_SECRET;
  if (!token || !secret) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, secret);
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(200).json({ message: "Token is valid" });
};

export default {
  donorLogin,
  adminLogin,
  adminLogout,
  donorLogout,
  adminCheckToken,
  donorCheckToken,
};
