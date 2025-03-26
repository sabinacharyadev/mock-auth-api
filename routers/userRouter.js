import express from "express";

const userRouter = express.Router();

userRouter.post("/", (req, res) => {
  console.log(req.body);
});

export default userRouter;
