// import { Server } from "socket.io";

// let io;

// const initSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5000",
//       methods: ["GET", "POST"]
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     socket.on("join", (userId) => {
//       socket.join(userId);
//       console.log(`User ${userId} joined their room`);
//     });

//     socket.on("sendMessage", ({ senderId, receiverId, message }) => {
//       io.to(receiverId).emit("receiveMessage", { senderId, message });
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });
// };

// export default  initSocket;
