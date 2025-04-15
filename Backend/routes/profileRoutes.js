import express from "express";
import Profile from "../models/Profile.js";
import { protect, authorize } from "../middleware/auth.js";
import Bureau from "../models/Bureau.js";

const router = express.Router();

// @desc    Get all profiles
// @route   GET /api/profiles
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get profile by ID
// @route   GET /api/profiles/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Create a profile
// @route   POST /api/profiles
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const newProfile = new Profile({
      ...req.body,
      createdBy: req.user.id,
    });

    // If profile comes from a bureau, check and update
    if (req.body.whatsappNumber) {
      const bureau = await Bureau.findOne({ phone: req.body.whatsappNumber });
      if (bureau) {
        newProfile.bureau = bureau._id;
        await Bureau.findByIdAndUpdate(bureau._id, {
          $inc: { profilesCreated: 1 },
        });
      }
    }

    const profile = await newProfile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update profile
// @route   PUT /api/profiles/:id
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    let profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Check if user is admin or the creator
    if (
      req.user.role !== "admin" &&
      req.user.role !== "superadmin" &&
      profile.createdBy.toString() !== req.user.id
    ) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this profile" });
    }

    profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Delete profile
// @route   DELETE /api/profiles/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Check if user is admin or the creator
    if (
      req.user.role !== "admin" &&
      req.user.role !== "superadmin" &&
      profile.createdBy.toString() !== req.user.id
    ) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this profile" });
    }

    await profile.remove();

    res.json({ message: "Profile removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Search profiles
// @route   POST /api/profiles/search
// @access  Private
router.post("/search", protect, async (req, res) => {
  try {
    const { gender, ageMin, ageMax, maritalStatus, caste, city } = req.body;

    let query = {};

    if (gender) query.gender = gender;
    if (maritalStatus) query.maritalStatus = maritalStatus;
    if (caste) query.caste = caste;
    if (city) query.preferredCity = { $regex: city, $options: "i" };

    // Age filter using DOB
    if (ageMin || ageMax) {
      query.dob = {};

      if (ageMax) {
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - ageMax);
        query.dob.$gte = minDate;
      }

      if (ageMin) {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - ageMin);
        query.dob.$lte = maxDate;
      }
    }

    const profiles = await Profile.find(query).sort({ createdAt: -1 });

    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Approve a profile (admin only)
// @route   PUT /api/profiles/:id/approve
// @access  Private/Admin
router.put(
  "/:id/approve",
  protect,
  authorize("admin", "superadmin"),
  async (req, res) => {
    try {
      const profile = await Profile.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true }
      );

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
