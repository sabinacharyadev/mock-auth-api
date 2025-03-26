import "dotenv/config";
import express from "express";
import { connectToDb } from "./config/dbConfig.js";
import userRouter from "./routers/userRouter.js";
import cors from "cors";

const app = express();
const PORT = process.env.PROD || 3000;

app.use(cors());
app.use(express.json());
connectToDb();

app.use("/api/v1/user", userRouter);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("Server running successfully");
});
