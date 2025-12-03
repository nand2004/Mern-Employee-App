import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: String,
    department: String,
    salary: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
