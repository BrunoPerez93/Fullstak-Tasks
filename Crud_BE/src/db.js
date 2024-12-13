import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://brunoperez24793:zumfelde24793r@cluster0.m6xi7gk.mongodb.net/crudDB?retryWrites=true&w=majority&appName=Cluster0");
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
