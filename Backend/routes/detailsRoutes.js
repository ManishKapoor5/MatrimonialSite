import express from "express";
import User from "../models/User.js";
import Registration from "../models/Registration.js";
import authenticateUser from "../middleware/authenticateUser.js"; // JWT auth middleware

const router = express.Router();

/**
 * @desc    Register a new user
 * @route   POST /api/users/registerdetails
 * @access  Public
 */
router.post("/registerdetails", async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      username,
      age,
      gender,
      height,
      location: { city, country },
      profession,
      education: { level, details },
      income,
      profilePhoto: profileImage,
      familyValues,
      parentsOccupation: { father, mother },
      siblings: {
        brothers,
        sisters,
        details: siblingsDetails,
      },
      religiousCulturalBackground: { religion, caste, subCaste, motherTongue },
      partnerPreferences: {
        ageRange: { min, max },
        educationLevel,
        professionalBackground,
        locationPreferences,
        culturalExpectations,
      },
      maritalStatus,
      mangalDosh,
      createdAt,
    } = req.body;

    const newUser = new Registration({
      userId,
      name,
      email,
      username,
      age,
      gender,
      height,
      location: { city, country },
      profession,
      education: { level, details },
      income,
      profileImage,
      familyValues,
      parentsOccupation: { father, mother },
      siblings: { brothers, sisters, details: siblingsDetails },
      religiousCulturalBackground: { religion, caste, subCaste, motherTongue },
      partnerPreferences: {
        ageRange: { min, max },
        educationLevel,
        professionalBackground,
        locationPreferences,
        culturalExpectations,
      },
      maritalStatus,
      mangalDosh,
      createdAt,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc    Post photo details (initial POST)
 * @route   POST /api/users/photodetails
 * @access  Public
 */
router.post("/photodetails/:id", async (req, res) => {
  try {
    const { id, name, profileImage, email, createdAt } = req.body;

    // const existingUser = await Registration.findOne({ email: User._id });

    // if (!existingUser) {
    //   return res.status(404).json({ message: "User not found with this ID" });
    // }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found in users collection" });

    // Then find registration details by matching email
    const registered = await Registration.findOne({ email: user.email });
    if (!registered) return res.status(404).json({ message: "User not found with this ID" });

    const updatedUser = await Registration.findOneAndUpdate(
      { userId: id },
      { $set: { name, profileImage, email, createdAt } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Image posted and user updated",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Photo upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc    Update photo with auth
 * @route   PUT /api/users/photodetails
 * @access  Protected
 */
router.put("/photodetails/:id", authenticateUser, async (req, res) => {
  try {
    const { id, name,email, profileImage, createdAt } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found in users collection" });

    // Then find registration details by matching email
    const registered = await Registration.findOne({ email: user.email });
    if (!registered) return res.status(404).json({ message: "User not found with this ID" });

    

    const updatedUser = await Registration.findOneAndUpdate(
      { userId: id },
      { $set: { name, profileImage, email, createdAt } },
      { new: true }
    );
    console.log("profileImage from backend",profileImage)
    res.status(201).json({
      success: true,
      message: "Image posted and user updated",
      data: updatedUser,
    });

    

   
  } catch (err) {
    console.error("Protected photo update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc    Get all registered users
 * @route   GET /api/users/registerdetails
 * @access  Public
 */
router.get("/registerdetails", async (req, res) => {
  try {
    const users = await Registration.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Fetch all error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/registerdetails/:id
 * @access  Public
 */
router.get("/registerdetails/:id", async (req, res) => {
  try {
    const user = await Registration.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Fetch single error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc    Get photo details of a user
 * @route   GET /api/users/photodetails/:id
 * @access  Public
 */
router.get("/photodetails/:id", async (req, res) => {
  try {
    const { id, name, profilePhoto, email, createdAt } = req.params.id;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found in users collection" });

     // Then find registration details by matching email
    const registered = await Registration.findOne({ email: user.email });
    if (!registered) return res.status(404).json({ message: "User not found with this ID" });

    
    // const user = await Registration.findById(req.params.id);
    // if (!user) return res.status(404).json({ message: "User not found" });

     res.status(200).json({
      success: true,
      data: {
        profileImage: registered.profileImage,
        name: name,
        email: email,
        createdAt: registered.createdAt,
      }})
  } catch (err) {
    console.error("Fetch photo details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc    Update user details by ID
 * @route   PUT /api/users/registerdetails/:id
 * @access  Public
 */
router.put("/registerdetails/:id", async (req, res) => {
  try {
    const updatedUser = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc    Delete user by ID
 * @route   DELETE /api/users/registerdetails/:id
 * @access  Public
 */
router.delete("/registerdetails/:id", async (req, res) => {
  try {
    const deletedUser = await Registration.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;