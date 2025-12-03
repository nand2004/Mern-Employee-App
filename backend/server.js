import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import employeeRoutes from "./routes/employee.js";


dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((err) => console.log("❌ Database connection error:", err));
