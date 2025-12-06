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
const app = express();

const port = Number(process.env.PORT);

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [`${process.env.FRONTEND_ORIGIN}`],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

// Note: Session stores removed - now using JWT-based authentication

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Routes - JWT authentication is handled within each route
app.use("/api/egg-donors", eggDonorRoutes);
app.use("/api/surrogate-donors", surrogateRoutes);
app.use("/api/sperm-donors", spermDonorRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
