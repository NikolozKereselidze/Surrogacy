import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blogRoutes";
import eggDonorRoutes from "./routes/eggDonorRoutes";
import surrogateRoutes from "./routes/surrogateRoutes";
import spermDonorRoutes from "./routes/spermDonorRoutes";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes";
import contactRoutes from "./routes/contactRoutes";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
