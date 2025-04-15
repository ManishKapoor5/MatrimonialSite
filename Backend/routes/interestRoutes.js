import { Router } from 'express';
const router = Router();
import { sendInterest, acceptInterest, rejectInterest, deleteInterest, getSentInterests } from '../controllers/interestController.js';
import Interest from '../models/Interest.js';

router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    console.log("✅ Send interest request:", req.body);
    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'senderId and receiverId are required.' });
    }
    const interest = new Interest({
      senderId,
      receiverId,
      status: 'Pending',
      sentAt: new Date(),
    });

    const saved = await interest.save();
    console.log("✅ Interest saved:", saved);

    res.status(200).json({ success: true, data: saved });
  } catch (err) {
    console.error("❌ Error in /interests/send:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/send", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    console.log("✅ Send interest fetch:", req.body);
    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'senderId and receiverId are required.' });
    }
    const interest = new Interest({
      senderId,
      receiverId,
      status: 'Pending',
      sentAt: new Date(),
    });

    const saved = await interest.save();
    console.log("✅ Interest saved:", saved);

    res.status(200).json({ success: true, data: saved });
  } catch (err) {
    console.error("❌ Error in /interests/send:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

import { verifyToken } from '../middleware/authMiddleware.js';

router.get('/received', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // comes from decoded token

    const interests = await Interest.find({ receiverId: userId, status: 'Pending' })
      .populate('senderId', 'email') // adjust fields as needed
      .sort({ sentAt: -1 });

    res.status(200).json({ success: true, data: interests });
  } catch (err) {
    console.error("❌ Error fetching received interests:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post('/send', sendInterest)
router.post('/accept', acceptInterest);
router.post('/reject', rejectInterest);
router.post('/delete', deleteInterest);
router.get('/sent',getSentInterests);
export default router;


// import { Router } from 'express';
// const router = Router();
// import Interest from '../models/Interest.js';
// import User from '../models/User.js';

// // Middleware to get current user (replace with your auth logic)
// const getCurrentUser = (req) => {
//   // Example: return req.user from JWT or session
//   return { _id: 'your_test_user_id' }; // Replace with actual auth
// };

// // Send Interest
// router.post('/send', async (req, res) => {
//   const { toProfileId } = req.body;
//   const fromUser = getCurrentUser(req);

//   try {
//     const interest = new Interest({ from: fromUser._id, to: toProfileId });
//     await interest.save();
//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// });

// // Get Sent Interests
// router.get('/sent', async (req, res) => {
//   const fromUser = getCurrentUser(req);

//   try {
//     const sent = await find({ from: fromUser._id }).populate('to', '_id name age profession imageUrl');
//     res.json({ success: true, data: { sent } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// });

// // Get Received Interests
// router.get('/received', async (req, res) => {
//   const toUser = getCurrentUser(req);

//   try {
//     const received = await find({ to: toUser._id }).populate('from', '_id name age profession imageUrl');
//     res.json({ success: true, data: { received } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// });

// // Mark All Read
// router.post('/markAllRead', async (req, res) => {
//   const toUser = getCurrentUser(req);

//   try {
//     await updateMany({ to: toUser._id, isRead: false }, { isRead: true });
//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// });

// // Mark One Read
// router.post('/markRead', async (req, res) => {
//   const { interestId } = req.body;

//   try {
//     await findByIdAndUpdate(interestId, { isRead: true });
//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// });

// export default router;