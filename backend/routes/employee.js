import express from "express";
import Employee from "../models/Employee.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", protect, async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  res.json(employees);
});


router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: "Failed to create employee" });
  }
});


router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update employee" });
  }
});


router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete employee" });
  }
});

export default router;
