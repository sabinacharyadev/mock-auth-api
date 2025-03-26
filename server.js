import "dotenv/config";
import express from "express";
import { connectToDb } from "./config/dbConfig.js";

const app = express();
const PORT = process.env.PROD || 3000;

connectToDb();

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("Server running successfully");
});
