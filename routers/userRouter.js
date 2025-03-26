import express from "express";
import { hashPassword } from "../utility/bcryptHelper.js";
import { errorResponse, successResponse } from "../utility/responseBuilder.js";
import { createUser } from "../model/userModel.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password);

    const user = await createUser({ name, email, password: hashedPassword });

    console.log(user);

    if (!user._id) return errorResponse(res, "User not created");

    successResponse(res, user, "User created successfully");
  } catch (error) {
    errorResponse(res, "Something went wrong");
  }
});

export default userRouter;
