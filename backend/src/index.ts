import express, { Request, Response } from "express";
import blogRoutes from "./routes/blogRoutes";
import eggDonorRoutes from "./routes/eggDonorRoutes";
import surrogateRoutes from "./routes/surrogateRoutes";
import spermDonorRoutes from "./routes/spermDonorRoutes";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(cors());
app.use("/api/blog", blogRoutes);
app.use("/api/egg-donors", eggDonorRoutes);
app.use("/api/surrogates", surrogateRoutes);
app.use("/api/sperm-donors", spermDonorRoutes);
app.use("/api/file", fileRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
