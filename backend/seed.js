import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "john", password: "john123", role: "user" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Remove old users 
    await User.deleteMany({});

    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`User ${userData.username} added.`);
    }

    await mongoose.connection.close();
    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
