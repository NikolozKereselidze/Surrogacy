import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import session from "express-session";
import blogRoutes from "./routes/blogRoutes";
import eggDonorRoutes from "./routes/eggDonorRoutes";
import surrogateRoutes from "./routes/surrogateRoutes";
import spermDonorRoutes from "./routes/spermDonorRoutes";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes";
import authRoutes from "./routes/auth";
import adminAuthRoutes from "./routes/adminAuth";
import contactRoutes from "./routes/contactRoutes";

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Create separate session stores for admin and donor
const donorSession = session({
  name: "donor.sid",
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
  },
});

const adminSession = session({
  name: "admin.sid",
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
  },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Apply donor session to donor routes
app.use("/api/egg-donors", donorSession, eggDonorRoutes);
app.use("/api/surrogates", donorSession, surrogateRoutes);
app.use("/api/sperm-donors", donorSession, spermDonorRoutes);
app.use("/api/file", donorSession, fileRoutes);
app.use("/api/auth", donorSession, authRoutes);
app.use("/api/contact", contactRoutes);

// Apply admin session to admin routes
app.use("/api/admin-auth", adminSession, adminAuthRoutes);

// Apply admin session to admin-only routes (blog management, etc.)
app.use("/api/blog", adminSession, blogRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
