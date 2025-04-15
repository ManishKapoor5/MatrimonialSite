// ChatBox.tsx
// import React, { useEffect, useState } from 'react';
// import socket from '../socket.js';
// interface ChatBoxProps {
//   myProfileId: string;
//   otherProfileId: string;
//   myName: string;
// }

// const ChatBox: React.FC<ChatBoxProps> = ({ myProfileId, otherProfileId, myName }) => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<string[]>([]);

//   const roomId = [myProfileId, otherProfileId].sort().join('-');

//   useEffect(() => {
//     socket.emit('join_room', roomId);
//     socket.on('receive_message', (data) => {
//       setMessages((prev) => [...prev, `${data.sender}: ${data.message}`]);
//     });
//     return () => {
//       socket.off('receive_message');
//     };
//   }, [roomId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const messageData = {
//         room: roomId,
//         message,
//         sender: myName,
//       };
//       socket.emit('send_message', messageData);
//       setMessages((prev) => [...prev, `You: ${message}`]);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="border rounded-lg p-3 mt-4 bg-white shadow max-w-md">
//       <div className="h-40 overflow-y-auto border-b pb-2 mb-2 text-sm">
//         {messages.map((msg, i) => (
//           <p key={i}>{msg}</p>
//         ))}
//       </div>
//       <div className="flex gap-2">
//         <input
//           className="flex-1 border p-1 rounded"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message"
//           onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <button onClick={sendMessage} className="bg-blue-500 text-white px-3 py-1 rounded">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { format } from 'date-fns';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ChatBoxProps {
  myProfileId: string;
  otherProfileId: string;
  myName: string;
  onMessageSent?: () => void; // Make it optional
}

interface Message {
  _id: string;
  senderId: string;
  content: string;
  room: string;
  createdAt: string;
  senderName?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ 
  myProfileId, 
  otherProfileId, 
  myName,
  onMessageSent 
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [otherUserName, setOtherUserName] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create the room ID by sorting the profile IDs alphabetically and joining them
  const roomId = [myProfileId, otherProfileId].sort().join('-');

  // Initialize socket connection
  useEffect(() => {


const socketInstance = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
  transports: ['websocket'],
});


    setSocket(socketInstance);
    
    // Join the room
    socketInstance.emit('joinRoom', { 
      room: roomId,
      userId: myProfileId,
      userName: myName
    });
    
    // Listen for new messages
    socketInstance.on('newMessage', (newMessage: Message) => {
      setMessages(prev => [...prev, newMessage]);
    });
    
    return () => {
      socketInstance.disconnect();
    };
  }, [myProfileId, otherProfileId, roomId, myName]);

  // Fetch previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/messages/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setMessages(response.data.data.messages || []);
        }
        
        // Also mark messages as read
        await axios.post(
          `${API_URL}/messages/markRoomRead`, 
          { roomId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOtherUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/profiles/${otherProfileId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          setOtherUserName(response.data.data.name || 'User');
        }
      } catch (error) {
        console.error('Error fetching other user:', error);
        setOtherUserName('User');
      }
    };

    fetchMessages();
    fetchOtherUserName();
  }, [roomId, otherProfileId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !socket) return;
    
    // Prepare the message object
    const newMessage = {
      senderId: myProfileId,
      content: message,
      room: roomId,
      senderName: myName,
      createdAt: new Date().toISOString()
    };
    
    setMessages((prev) => [...prev, { ...newMessage, _id: Date.now().toString() }]);

    // Emit the message through socket
    socket.emit('sendMessage', newMessage);
    
    // Also save via API for persistence
    const saveMessage = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          `${API_URL}/messages/send`,
          {
            content: message,
            senderId: myProfileId,
            receiverId: otherProfileId,
            room: roomId
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Call the onMessageSent callback if provided
        if (onMessageSent) {
          onMessageSent();
        }
      } catch (error) {
        console.error('Error saving message:', error);
      }
    };
    
    saveMessage();
    
    // Clear the input
    setMessage('');
  };

  const formatMessageTime = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'p');
    } catch (e) {
      return '';
    }
  };

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Chat with {otherUserName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 overflow-y-auto p-4 space-y-4 border rounded-md">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading messages...</p>
            </div>
          ) : messages.length > 0 ? (
            <>
              {messages.map((msg) => (
                <div 
                  key={msg._id} 
                  className={`flex ${msg.senderId === myProfileId ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3/4 p-3 rounded-lg ${
                      msg.senderId === myProfileId 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === myProfileId 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {formatMessageTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-muted-foreground">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;