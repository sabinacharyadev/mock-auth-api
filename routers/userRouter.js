import express from "express";
import { hashPassword } from "../utility/bcryptHelper.js";
import { compareSync } from "bcryptjs";

const userRouter = express.Router();

userRouter.post("/", (req, res) => {
  const { name, email, password } = req.body;
});

export default userRouter;
