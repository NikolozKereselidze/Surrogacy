// Load environment variables FIRST before any other imports
import "dotenv/config";

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blogRoutes.js";
import eggDonorRoutes from "./routes/eggDonorRoutes.js";
import surrogateRoutes from "./routes/surrogateRoutes.js";
import spermDonorRoutes from "./routes/spermDonorRoutes.js";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import teamMemberRoutes from "./routes/teamMemberRoutes.js";
import { prisma } from "./lib/prisma.js";
const app = express();

const port = Number(process.env.PORT ?? 4000);

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [`${process.env.FRONTEND_ORIGIN}`],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);

// Note: Session stores removed - now using JWT-based authentication

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Liveness must not touch the database. Render can check this endpoint without
// unnecessarily waking a suspended Neon compute.
app.get("/healthz", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Use this endpoint for diagnostics, not frequent platform health checks.
app.get("/readyz", async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ready" });
  } catch (error) {
    console.error("Database readiness check failed", error);
    res.status(503).json({ status: "unavailable" });
  }
});

// Routes - JWT authentication is handled within each route
app.use("/api/egg-donors", eggDonorRoutes);
app.use("/api/surrogate-donors", surrogateRoutes);
app.use("/api/sperm-donors", spermDonorRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/team-members", teamMemberRoutes);

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

const shutdown = (signal: string) => {
  console.log(`${signal} received; shutting down`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));
