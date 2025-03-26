import mongoose from "mongoose";
const CONNECTION_URL = process.env.DATABASE_URL;

export const connectToDb = () => {
  try {
    const connect = mongoose.connect(`${CONNECTION_URL}`);
    if (connect) console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
