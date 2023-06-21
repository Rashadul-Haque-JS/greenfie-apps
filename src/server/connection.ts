import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
const options: ConnectOptions = {
  maxPoolSize: 100,
  minPoolSize: 0,
};

const connectToDB = async () => {
  if (!uri) {
    throw new Error("No Mongoose URI");
  }
  try {
    await mongoose.connect(uri, options);
    console.log("MongoDB connected");
  } catch (err:any) {
    console.error(err.message);
  }
};

export default connectToDB;
