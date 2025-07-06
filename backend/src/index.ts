import express, { Request, Response } from "express";
import blogRoutes from "./routes/blogRoutes";
import cors from "cors";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(cors());
app.use("/api/blog", blogRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
