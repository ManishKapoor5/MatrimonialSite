// server.js (or index.js)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";
import http from "http";

// Route imports

import userRoutes from "./routes/userRoutes.js";
import bureauRoutes from "./routes/bureauRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import detailsRoutes from "./routes/detailsRoutes.js";
import profile from "./routes/profile.js";
import interestRoutes from "./routes/interestRoutes.js";
// Model & Controller

import authRoutes from "./middleware/authRoutes.js";
import fileupload from "express-fileupload";
import { Server } from 'socket.io';

//const filePath = process.argv[2] || path.join(process.cwd(), 'client', 'dist', 'index.html');
// Setup
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

// const socketInstance = io(process.env.VITE_SOCKET_URL || 'http://localhost:5000');


// File path helpers for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));



// API Routes
app.use("/api/users", userRoutes);
app.use("/api/bureaus", bureauRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/registerdetails", detailsRoutes);
app.use("/api/profiles",profile)
app.use("/api/interest",interestRoutes);

app.use(fileupload({
  useTempFiles: true,
}
));


// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Socket.io
// io.on('connection', (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User Disconnected', socket.id);
//   });
// });


// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('join_room', (room) => {
//     socket.join(room);
//     console.log(`User joined room: ${room}`);
//   });

//   socket.on('send_message', (data) => {
//     console.log('Message received:', data);
//     socket.to(data.room).emit('receive_message', data); // Send to other users in the room
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('send_message', (data) => {
    console.log('Sending to room:', data.room, data);
    io.to(data.room).emit('newMessage', data);  // <-- 🔥 This is the real-time part
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Routes
app.use('/api/auth', authRoutes);
// Socket.IO Logic


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
