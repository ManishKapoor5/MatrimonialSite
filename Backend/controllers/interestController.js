import Interest from '../models/Interest.js';
import User from '../models/User.js'; // assuming you have this model

// Send Interest
export async function sendInterest(req, res) {
  try {
    const { senderId, receiverId } = req.body;

    // Check if an interest already exists
    const existingInterest = await Interest.findOne({ senderId, receiverId });
    if (existingInterest) {
      return res.status(400).json({ message: 'Interest already sent' });
    }

    // Create new interest
    const interest = new Interest({ senderId, receiverId });
    await interest.save();

    // Update interest counts in User schema
    await User.findByIdAndUpdate(senderId, { $inc: { interestSentCount: 1 } });
    await User.findByIdAndUpdate(receiverId, { $inc: { interestReceivedCount: 1 } });

    res.status(201).json({ message: 'Interest sent successfully', interest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

// Accept Interest
export async function acceptInterest(req, res) {
  try {
    const { interestId } = req.body;

    const interest = await Interest.findById(interestId);
    if (!interest) {
      return res.status(404).json({ message: 'Interest not found' });
    }

    interest.status = 'Accepted';
    interest.respondedAt = new Date();
    await interest.save();

    res.status(200).json({ message: 'Interest accepted successfully', interest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

// Reject Interest
export async function rejectInterest(req, res) {
  try {
    const { interestId } = req.body;

    const interest = await Interest.findById(interestId);
    if (!interest) {
      return res.status(404).json({ message: 'Interest not found' });
    }

    interest.status = 'Rejected';
    interest.respondedAt = new Date();
    await interest.save();

    res.status(200).json({ message: 'Interest rejected successfully', interest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

// Delete Interest
export async function deleteInterest(req, res) {
  try {
    const { interestId } = req.body;

    const interest = await Interest.findById(interestId);
    if (!interest) {
      return res.status(404).json({ message: 'Interest not found' });
    }

    const { senderId, receiverId } = interest;

    await Interest.findByIdAndDelete(interestId);

    await User.findByIdAndUpdate(senderId, { $inc: { interestSentCount: -1 } });
    await User.findByIdAndUpdate(receiverId, { $inc: { interestReceivedCount: -1 } });

    res.status(200).json({ message: 'Interest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

// Get Interests Sent by a User
export async function getSentInterests(req, res) {
  try {
    const { userId } = req.params;

    const interests = await Interest.find({ senderId: userId })
      .populate('receiverId', 'name email profilePicture') // adjust fields as needed
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: interests });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
}
