import mongoose from "mongoose";

const connectToDatabase = async () =>
  await mongoose.connect(process.env.DATABASE_URL as string);

export default connectToDatabase;
