import express from "express";
import Bureau from "../models/Bureau.js";
// import Profile from "../models/Profile.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all bureaus
// @route   GET /api/bureaus
// @access  Private/Admin
router.get("/", protect, authorize("admin", "superadmin"), async (req, res) => {
  try {
    const bureaus = await Bureau.find().sort({ name: 1 });
    res.json(bureaus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get bureau by ID
// @route   GET /api/bureaus/:id
// @access  Private/Admin
router.get(
  "/:id",
  protect,
  authorize("admin", "superadmin"),
  async (req, res) => {
    try {
      const bureau = await Bureau.findById(req.params.id);

      if (!bureau) {
        return res.status(404).json({ message: "Bureau not found" });
      }

      res.json(bureau);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc    Create a bureau
// @route   POST /api/bureaus
// @access  Private/Admin
router.post(
  "/",
  protect,
  authorize("admin", "superadmin"),
  async (req, res) => {
    try {
      const newBureau = new Bureau(req.body);
      const bureau = await newBureau.save();
      res.status(201).json(bureau);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc    Update bureau
// @route   PUT /api/bureaus/:id
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  authorize("admin", "superadmin"),
  async (req, res) => {
    try {
      const bureau = await Bureau.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!bureau) {
        return res.status(404).json({ message: "Bureau not found" });
      }

      res.json(bureau);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc    Delete bureau
// @route   DELETE /api/bureaus/:id
// @access  Private/Admin
router.delete(
  "/:id",
  protect,
  authorize("admin", "superadmin"),
  async (req, res) => {
    try {
      const bureau = await Bureau.findById(req.params.id);

      if (!bureau) {
        return res.status(404).json({ message: "Bureau not found" });
      }

      // Remove bureau reference from profiles
      await Profile.updateMany(
        { bureau: req.params.id },
        { $set: { bureau: null } }
      );

      await bureau.remove();

      res.json({ message: "Bureau removed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc    Get profiles from a bureau
// @route   GET /api/bureaus/:id/profiles
// @access  Private/Admin
router.get(
  "/:id/profiles",
  protect,
  authorize("admin", "superadmin"),
  async (req, res) => {
    try {
      const profiles = await Profile.find({ bureau: req.params.id }).sort({
        createdAt: -1,
      });
      res.json(profiles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
