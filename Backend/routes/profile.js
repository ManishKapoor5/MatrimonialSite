import User from "../models/User.js";
import express from "express";

const router = express.Router();
// routes/profile.js
router.get('/count', async (req, res) => {
  try {
    const count = await User.countDocuments(); // Profile is your MongoDB model
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
