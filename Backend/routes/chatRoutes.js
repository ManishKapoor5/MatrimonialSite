import { Router } from "express";
const router = Router();
import { sendMessage, getMessages } from "../controllers/ChatController.js";

router.post("/send", sendMessage);
router.get("/messages/:senderId/:receiverId", getMessages);

export default router;