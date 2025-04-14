import express from "express";
import User from "../models/User.js";
import mongoose from 'mongoose';
import {
  protect,
  authorize,
  loginRateLimiter,
  blacklistToken,
} from "../middleware/auth.js";
// Import the Image model that's missing

// routes/userRoutes.js

const router = express.Router();

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    user = new User({
      name,
      email,
      password,
      phone,
    });

    await user.save();

    // Create token
    const token = user.getSignedJwtToken();

    // Log new registration
    console.log(`New user registered: ${email}`);

    res.status(201).json({
      success: true,
      token,
      userId: user._id, // 👈 id include kiya yahan
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Register admin user (initial setup only)
// @route   POST /api/users/register-admin
// @access  Public (but should be secured in production)
router.post("/register-admin", async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

    // Check if any admin exists
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin user already exists" });
    }

    // Create admin user
    const admin = new User({
      name: "Admin User",
      email: adminEmail,
      password: process.env.ADMIN_DEFAULT_PASSWORD || "admin123",
      phone: "1234567890",
      role: "admin",
      isActive: true,
    });

    await admin.save();

    console.log(`Admin user created: ${adminEmail}`);

    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
router.post("/login", loginRateLimiter(), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      // Log failed login attempt
      console.log(`Failed login attempt for email: ${email} - User not found`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user is active
    if (!user.isActive) {
      console.log(`Login attempt for deactivated account: ${email}`);
      return res
        .status(401)
        .json({ message: "Your account has been disabled" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      // Log failed login attempt
      console.log(
        `Failed login attempt for email: ${email} - Incorrect password`
      );
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = user.getSignedJwtToken();

    // Log successful login
    console.log(`User logged in: ${email} (${user.role})`);

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/login/:id", (req, res) => {
  res.status(200).json({ message: "Login route" });
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
router.post("/logout", protect, async (req, res) => {
  try {
    // Blacklist the token
    if (req.token) {
      blacklistToken(req.token);
      console.log(`User logged out: ${req.user.email}`);
    }

    res.json({ success: true, message: "Successfully logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get current user
// @route   GET /api/users/me
// @access  Private
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get user activity logs
// @route   GET /api/users/me/logs
// @access  Private
router.get("/me/logs", protect, async (req, res) => {
  try {
    // In a real implementation, you would fetch actual logs from a database
    // For now, we'll return a mock response
    const logs = [
      { action: "Profile update", timestamp: new Date(Date.now() - 86400000) },
      { action: "Login", timestamp: new Date(Date.now() - 172800000) },
      {
        action: "Preference update",
        timestamp: new Date(Date.now() - 259200000),
      },
    ];

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update user
// @route   PUT /api/users/me
// @access  Private
router.put("/me", protect, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Change password
// @route   PUT /api/users/password
// @access  Private
router.put("/password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Basic password complexity check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, and numbers",
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    // Log password change
    console.log(`Password changed for user: ${user.email}`);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Image routes - moved to a separate section and fixed

/**
 * @route   POST /api/users/image
 * @desc    Create a new image
 * @access  Public
 */
router.post('/insertimage', async (req, res) => {
  try {
    const { userid, name, image } = req.body;
    
    if (!userid || !name || !image) {
      return res.status(400).json({ message: 'Please provide userid, name, and image URL' });
    }
    
    // Check if image with this userid already exists
    const existingImage = await Image.findOne({ userid });
    if (existingImage) {
      return res.status(400).json({ message: 'An image with this user ID already exists' });
    }
    
    const newImage = new Image({
      userid,
      name,
      image
    });
    
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/users/images
 * @desc    Get all images
 * @access  Public
 */
router.get('/image', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/users/image/:id
 * @desc    Get image by ID
 * @access  Public
 */
router.get('/image/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format');
  }

  try {
    const image = await Image.findById(id); // fetch by _id
    if (!image) return res.status(404).send('Image not found');

    res.json({
      imageUrl: image.image, // return the image URL
      name: image.name,
      userId: image.userid,
    });
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/users/image/:id
 * @desc    Update image by user ID
 * @access  Public
 */
router.put('/image/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    console.log("\n\n=========================⬇ UPDATE IMAGE REQUEST STARTED ⬇=========================");
    console.log("🔗 PUT /image/:id");
    console.log("🆔 Received ID from params:", id);
    console.log("📥 Request body received:", { name, image });

    const updateData = {};

    if (name) {
      updateData.name = name;
      console.log("✅ Name added to updateData:", name);
    }

    if (image) {
      updateData.image = image;
      console.log("🖼 Image added to updateData:", image);
    }

    console.log("🔧 Final updateData object prepared:", updateData);

    // Optional: check if this userId even exists in your collection
    const existing = await Image.findOne({ userid: id });
    if (!existing) {
      console.log("⚠ No matching document found before update attempt. userId:", id);
    } else {
      console.log("📌 Matching document found before update:", existing);
    }

    const updatedImage = await Image.findOneAndUpdate(
      { userid: id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      console.log("❌ No document updated. Check if userId is valid:", id);
      return res.status(404).json({ message: 'Image not found' });
    }

    console.log("✅ Successfully updated image:", updatedImage);
    console.log("=========================✅ UPDATE COMPLETE ✅=========================\n\n");

    res.status(200).json(updatedImage);

  } catch (error) {
    console.error("🔥 ERROR CAUGHT:", error.message);
    res.status(500).json({ message: error.message });
  }
});
 
/**
 * @route   DELETE /api/users/image/:id
 * @desc    Delete an image by user ID
 * @access  Public
 */
router.delete('/image/:id', async (req, res) => {
  try {
    const deletedImage = await Image.findOneAndDelete({ userid: req.params.id });
    
    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
