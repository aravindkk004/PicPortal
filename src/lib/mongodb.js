import Mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }
};
