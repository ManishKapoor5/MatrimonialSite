import express from "express";
// import Profile from "../models/Profile.js";
import User from "../models/User.js";
import Bureau from "../models/Bureau.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get("/stats", protect, authorize("admin"), async (req, res) => {
  try {
    const totalProfiles = await Profile.countDocuments();

    // Calculate new profiles today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newProfilesToday = await Profile.countDocuments({
      createdAt: { $gte: today },
    });

    const totalBureaus = await Bureau.countDocuments();

    // Count successful matches (approved profiles)
    const successfulMatches = await Profile.countDocuments({
      isApproved: true,
    });

    // Count users by role
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: "admin" });
    const activeUsers = await User.countDocuments({ isActive: true });

    // Get latest login activity (if you have a login activity model)
    // For now, simulating with static data
    const loginActivity = {
      today: Math.floor(Math.random() * 50) + 20,
      thisWeek: Math.floor(Math.random() * 200) + 100,
    };

    res.json({
      totalProfiles,
      newProfilesToday,
      totalBureaus,
      successfulMatches,
      userStats: {
        total: totalUsers,
        admin: adminUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
      },
      loginActivity,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get recent activity
// @route   GET /api/admin/activity
// @access  Private/Admin
router.get("/activity", protect, authorize("admin"), async (req, res) => {
  try {
    // Get the 20 most recent profiles
    const recentProfiles = await Profile.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("createdBy", "name")
      .populate("bureau", "name");

    const activities = recentProfiles.map((profile) => {
      let action = "New profile added";
      let user = profile.createdBy ? profile.createdBy.name : "System";

      if (profile.bureau) {
        action = "New profile from bureau";
        user = profile.bureau.name;
      }

      return {
        action,
        user,
        profileId: profile._id,
        profileName: profile.name,
        time: profile.createdAt,
      };
    });

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Manage users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get("/users", protect, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
router.put("/users/:id/role", protect, authorize("admin"), async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !["user", "admin", "moderator"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Log the role change
    console.log(
      `User role update: ${req.params.id} changed to ${role} by ${req.user.email}`
    );

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
router.put(
  "/users/:id/status",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { isActive } = req.body;

      const targetUser = await User.findById(req.params.id);

      if (!targetUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Log the status change
      console.log(
        `User status update: ${req.params.id} changed to ${
          isActive ? "active" : "inactive"
        } by ${req.user.email}`
      );

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive },
        { new: true }
      );

      res.json({
        success: true,
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc    Get user activity logs
// @route   GET /api/admin/users/:id/logs
// @access  Private/Admin
router.get("/users/:id/logs", protect, authorize("admin"), async (req, res) => {
  try {
    // In a real implementation, you would fetch actual logs from a database
    // For now, returning mock data
    const logs = [
      {
        action: "Login",
        timestamp: new Date(Date.now() - Math.random() * 10000000),
      },
      {
        action: "Profile update",
        timestamp: new Date(Date.now() - Math.random() * 20000000),
      },
      {
        action: "Password change",
        timestamp: new Date(Date.now() - Math.random() * 30000000),
      },
      {
        action: "Search performed",
        timestamp: new Date(Date.now() - Math.random() * 40000000),
      },
    ];

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Bulk approve profiles
// @route   POST /api/admin/profiles/approve
// @access  Private/Admin
router.post(
  "/profiles/approve",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const { profileIds } = req.body;

      if (
        !profileIds ||
        !Array.isArray(profileIds) ||
        profileIds.length === 0
      ) {
        return res.status(400).json({ message: "No profile IDs provided" });
      }

      await Profile.updateMany(
        { _id: { $in: profileIds } },
        { $set: { isApproved: true } }
      );

      res.json({ success: true, count: profileIds.length });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc    Generate system report
// @route   GET /api/admin/reports/system
// @access  Private/Admin
router.get("/reports/system", protect, authorize("admin"), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProfiles = await Profile.countDocuments();
    const totalBureaus = await Bureau.countDocuments();

    // Monthly growth data (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyData = await Profile.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Format the monthly data
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedMonthlyData = monthlyData.map((item) => ({
      month: months[item._id.month - 1],
      year: item._id.year,
      count: item.count,
    }));

    res.json({
      totalUsers,
      totalProfiles,
      totalBureaus,
      monthlyGrowth: formattedMonthlyData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Perform system backup
// @route   POST /api/admin/system/backup
// @access  Private/Admin
router.post("/system/backup", protect, authorize("admin"), async (req, res) => {
  try {
    // Simulate backup process
    console.log(`System backup initiated by ${req.user.email}`);

    // In a real implementation, this would trigger a backup process
    // Here we're just returning a success response after a delay
    setTimeout(() => {
      res.json({
        success: true,
        message: "System backup initiated successfully",
        backupTime: new Date(),
      });
    }, 1000);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
