"use server";

import mongoose from "mongoose";

const DBURL: string = process.env.DBURL as string;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(DBURL);
    console.log("Database connection successful");
  } catch (err) {
    console.error(`Database connection failed: ${err}`);
  }
};

connectDB();
