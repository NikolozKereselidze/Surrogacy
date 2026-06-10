import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const donorLogin = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  if (
    username !== process.env.DONOR_ACCESS_USERNAME ||
    password !== process.env.DONOR_ACCESS_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, process.env.DONOR_JWT_SECRET || "", {
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

  if (
    username !== process.env.ADMIN_ACCESS_USERNAME ||
    password !== process.env.ADMIN_ACCESS_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, process.env.ADMIN_JWT_SECRET || "", {
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
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET || "");
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(200).json({ message: "Token is valid" });
};

const donorCheckToken = async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies.donorToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.DONOR_JWT_SECRET || "");
  if (!decoded) {
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
