// // Frontend: ChatPage.tsx - Chat opens by clicking on a user
// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import { motion } from "framer-motion";

// const socket = io("http://localhost:5000");

// interface Message {
//   sender: string;
//   recipient: string;
//   content: string;
//   timestamp: string;
// }

// interface User {
//   id: string;
//   name: string;
// }

// const mockUsers: User[] = [
//   { id: "user2", name: "Priya" },
//   { id: "user3", name: "Rahul" },
//   { id: "user4", name: "Anjali" },
// ];

// export default function ChatPage() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [userId, setUserId] = useState<string>("");
//   const [recipient, setRecipient] = useState<User | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const id = localStorage.getItem("userId") || "user1";
//     setUserId(id);

//     socket.emit("join", id);

//     socket.on("receive_message", (message: Message) => {
//       if (
//         recipient &&
//         ((message.sender === userId && message.recipient === recipient.id) ||
//           (message.sender === recipient.id && message.recipient === userId))
//       ) {
//         setMessages((prev) => [...prev, message]);
//       }
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [userId, recipient]);

//   useEffect(() => {
//     if (userId && recipient) {
//       fetchMessages();
//     }
//   }, [userId, recipient]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const fetchMessages = async () => {
//     const res = await axios.get(
//       `http://localhost:5000/messages/${userId}/${recipient?.id}`
//     );
//     setMessages(res.data);
//   };

//   const sendMessage = () => {
//     if (!recipient || !newMessage.trim()) return;
//     const message: Message = {
//       sender: userId,
//       recipient: recipient.id,
//       content: newMessage,
//       timestamp: new Date().toISOString(),
//     };
//     socket.emit("send_message", message);
//     setMessages((prev) => [...prev, message]);
//     setNewMessage("");
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto grid grid-cols-3 gap-4">
//       {/* User list */}
//       <div className="border rounded p-2 h-[500px] overflow-y-auto bg-white shadow-md">
//         <h2 className="font-bold mb-2 text-lg">Users</h2>
//         {mockUsers.map((user) => (
//           <div
//             key={user.id}
//             className={`cursor-pointer p-2 rounded mb-1 transition-colors ${
//               recipient?.id === user.id ? "bg-blue-100" : "hover:bg-gray-100"
//             }`}
//             onClick={() => setRecipient(user)}
//           >
//             {user.name}
//           </div>
//         ))}
//       </div>

//       {/* Chat window */}
//       <div className="col-span-2 bg-white border rounded shadow-md p-4">
//         {recipient ? (
//           <>
//             <h2 className="font-semibold text-lg mb-4 border-b pb-2">
//               Chat with {recipient.name}
//             </h2>
//             <div className="h-[400px] overflow-y-scroll space-y-2 px-2">
//               {messages.length === 0 && (
//                 <div className="text-center text-gray-400 mt-10">
//                   No messages yet. Start the conversation!
//                 </div>
//               )}
//               {messages.map((msg, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className={`max-w-xs p-2 rounded-xl ${
//                     msg.sender === userId
//                       ? "ml-auto bg-blue-100 text-right"
//                       : "mr-auto bg-gray-100"
//                   }`}
//                 >
//                   <div className="text-sm break-words">{msg.content}</div>
//                   <div className="text-xs text-gray-500">
//                     {new Date(msg.timestamp).toLocaleTimeString()}
//                   </div>
//                 </motion.div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//             <div className="mt-4 flex gap-2">
//               <input
//                 className="flex-1 border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type a message..."
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               />
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 onClick={sendMessage}
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-gray-500 h-full flex items-center justify-center text-lg">
//             Select a user to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import ChatBox from "../components/ChatWindow.tsx";

// Dummy data for testing
const currentUserId = "user1";
const chatWithId = "user2";

export default function ChatPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <ChatBox currentUserId={currentUserId} chatWithId={chatWithId} />
    </div>
  );
}
