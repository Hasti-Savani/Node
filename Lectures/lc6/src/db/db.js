import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // DEBUG LINE

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Mongodb connection Error", error);
    process.exit(1);
  }
};

export default connectDb;
