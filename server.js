import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PROD || 3000;

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("Server running successfully");
});
