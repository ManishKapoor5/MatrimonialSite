import Chat from "../models/Chat.js";
import UserChat from "../models/UserChat.js";

// Send Message
export async function sendMessage(req, res) {
  try {
    const { senderId, receiverId, message } = req.body;

    const chat = new Chat({ senderId, receiverId, message });
    await chat.save();

    res.status(201).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Fetch Messages Between Two Users
export async function getMessages(req, res) {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort("sentAt");

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update Last Seen & Online Status
export async function updateStatus(userId, status) {
  try {
    await findByIdAndUpdate(userId, {
      online: status,
      lastSeen: status ? null : new Date(),
    });
  } catch (error) {
    console.error("Error updating user status:", error);
  }
}

export default { sendMessage, getMessages, updateStatus };