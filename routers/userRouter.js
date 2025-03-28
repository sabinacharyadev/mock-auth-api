import express from "express";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import { errorResponse, successResponse } from "../utility/responseBuilder.js";
import { createUser, findUserByEmail, updateUser } from "../model/userModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  createSession,
  deleteSession,
  findSession,
} from "../model/sessionModel.js";
import { sendVerificationEmail } from "../utility/nodeMailerHelper.js";
import { generateJWT, verifyToken } from "../utility/jwtHelper.js";

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

// LOGIN USER
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user._id) return errorResponse(res, "Invalid Credentials");
    if (!user.isVerified) return errorResponse(res, "User not verified");
    if (!comparePassword(password, user.password))
      return errorResponse(res, "Invalid Credentials");

    const jwt = generateJWT(user.email);

    const loginSession = await createSession({ email, token: jwt.accessToken });
    if (!loginSession._id)
      return errorResponse(res, "Could not create session. Please try again");

    successResponse(res, jwt, "Logged in successfully");
  } catch (error) {
    console.log(error);
    errorResponse(res, "Something went wrong");
  }
});

// GET USER INFO
userRouter.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const decodedToken = verifyToken(authorization);
    if (!decodedToken.email) return errorResponse(res, "Invalid token");

    const session = await findSession({
      email: decodedToken.email,
      token: authorization,
    });

    if (!session._id) return errorResponse(res, "Invalid session");

    const user = await findUserByEmail(decodedToken.email);

    !user._id
      ? errorResponse(res, "User not found")
      : successResponse(res, {
          _id: user._id,
          name: user.name,
          email: user.email,
        });
  } catch (error) {
    console.log(error);
    errorResponse(res, "Something went wrong");
  }
});

export default userRouter;
