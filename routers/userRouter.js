import express from "express";
import { hashPassword } from "../utility/bcryptHelper.js";
import { errorResponse, successResponse } from "../utility/responseBuilder.js";
import { createUser, findUserByEmail, updateUser } from "../model/userModel.js";
import { v4 as uuidv4 } from "uuid";
import { createSession, deleteSession } from "../model/sessionModel.js";
import { sendVerificationEmail } from "../utility/nodeMailerHelper.js";

const userRouter = express.Router();
// CREATE USER
userRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password);

    const user = await createUser({ name, email, password: hashedPassword });

    if (!user._id) return errorResponse(res, "User not created");
    const sessionToken = uuidv4();
    const session = await createSession({ email, token: sessionToken });
    if (!session._id) return errorResponse(res, "User session not created");
    const verificationLink = `${process.env.CLIENT_URL}/verify-user?email=${session.email}&token=${session.token}`;
    sendVerificationEmail(email, verificationLink);
    successResponse(res, {}, "Please check your inbox for verification");
  } catch (error) {
    console.log(error);
    errorResponse(res, "Something went wrong");
  }
});

// VERIFY USER
userRouter.patch("/verify-user", async (req, res) => {
  const { email, token } = req.body;

  const user = await findUserByEmail(email);
  if (!user._id) {
    return errorResponse(res, "User not found");
  }

  const session = await deleteSession({ email, token });
  if (!session) {
    return errorResponse(res, "Invalid token");
  }

  const userVerify = await updateUser(user._id);
  !userVerify._id
    ? errorResponse(res, "User not verified")
    : successResponse(res, {}, "User verified, Please login");
});

export default userRouter;
