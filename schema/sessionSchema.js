import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const sessionModel = new mongoose.model("session", sessionSchema);
export default sessionModel;
