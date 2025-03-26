import mongoose from "mongoose";
const CONNECTION_URL = process.env.DATABASE_URL;
const DATABASE = "/mockauth";

export const connectToDb = () => {
  try {
    const connect = mongoose.connect(`${CONNECTION_URL}${DATABASE}`);
    if (connect) console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
