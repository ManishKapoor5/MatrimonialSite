// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
// import DetailedProfileCard, { DetailedProfileData } from '@/components/profile/DetailedProfileCard';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, ArrowRight } from 'lucide-react';
// import { toast } from 'sonner';
// import axios from 'axios';
// import ChatBox from '@/components/ChatWindow';
// import { useAuth } from '@/contexts/AuthContext';
// import { getProfileById } from '@/services/profileService';
// import { io, Socket } from 'socket.io-client';

// // This should match your api.ts configuration
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const DetailedProfiles: React.FC = () => {
//   const navigate = useNavigate();
//   const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
//   const [data, setData] = useState<DetailedProfileData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [sentInterests, setSentInterests] = useState<string[]>([]);
//   const [showChat, setShowChat] = useState<boolean>(false);
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const { user } = useAuth();

//   // Create a memoized room ID only when needed
//   const getRoomId = () => {
//     if (!user?._id || !data[currentProfileIndex]?._id) return '';
//     return [user._id, data[currentProfileIndex]._id].sort().join('-');
//   };

//   // Initialize socket connection only once
//   // useEffect(() => {
//   //   const socketInstance = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
//   //   setSocket(socketInstance);
    
//   //   return () => {
//   //     socketInstance.disconnect();
//   //   };
//   // }, []);

//   // Scroll to chat when it's shown
//   useEffect(() => {
//     if (showChat) {
//       const chatElement = document.getElementById('chatbox');
//       chatElement?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [showChat]);

//   // Fetch sent interests helper function
//   const fetchSentInterests = async () => {
//     if (!user?._id) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/interest/sent`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success && response.data.data?.sent) {
//         const sentProfileIds = response.data.data.sent.map((interest: any) => {
//           return interest.to?.id || interest.to?._id || interest.toProfileId || 
//                 (typeof interest.to === 'string' ? interest.to : null);
//         }).filter(Boolean);
        
//         setSentInterests(sentProfileIds);
//       }
//     } catch (error) {
//       console.error('Error refreshing interests:', error);
//     }
//   };

//   // Fetch profiles and interests on component mount
//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         // Make sure this path is correct based on your API structure
//         const response = await axios.get(`${API_URL}/registerdetails/registerdetails`);
//         if (Array.isArray(response.data)) {
//          console.log('Fetched profiles:', response.data);
//           setData(response.data);
//         } else {
//           console.error('Invalid data format received');
//         }
//       } catch (error) {
//         console.error('Error fetching profiles:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//     fetchSentInterests();
//   }, [user?._id]);

//   const handlePrevious = () => {
//     if (data.length > 0) {
//       setCurrentProfileIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
//       setShowChat(false);
//     }
//   };

//   const handleNext = () => {
//     if (data.length > 0) {
//       setCurrentProfileIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
//       setShowChat(false);
//     }
//   };

//   const handleContact = () => {
//     if (data.length > 0) {
//       toast.success(`Contact request sent to ${data[currentProfileIndex].name}`);
//     }
//   };

//   const handleInterest = async () => {
//     if (!user?._id) {
//       toast.error('Please login to show interest');
//       return;
//     }
    
//     if (data.length === 0) return;
    
//     const profileId = data[currentProfileIndex]._id;
    
//     // Check if interest already sent
//     if (sentInterests.includes(profileId)) {
//       toast.info(`You have already shown interest in ${data[currentProfileIndex].name}'s profile`);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
      
//       // Corrected API path for sending interest
//       const response = await axios.post(
//         `${API_URL}/interest/send`, 
//         {
//           senderId: user._id,
//           receiverId: profileId,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (response.data.success) {
//         // Immediately update local state
//         setSentInterests(prev => [...prev, profileId]);
//         toast.success(`Interest shown in ${data[currentProfileIndex].name}'s profile`);
        
//         // Also refresh interests from server to ensure consistency
//         setTimeout(() => {
//           fetchSentInterests();
//         }, 500);
//       } else {
//         toast.error(response.data.message || 'Failed to send interest');
//       }
//     } catch (error: any) {
//       console.error('Error sending interest:', error);
//       toast.error(error.response?.data?.message || 'Failed to send interest. Please try again.');
//     }
//   };

//   const handleChat = () => {
//     if (!user?._id) {
//       toast.error('Please login to chat with profiles');
//       return;
//     }
    
//     if (data.length === 0) return;
    
//     const profileId = data[currentProfileIndex]._id;
    
//     // Check if interest has been sent
//     if (!sentInterests.includes(profileId)) {
//       toast.info('Please show interest in the profile to start chat.');
//       return;
//     }
    
//     // Toggle chat window
//     setShowChat(prev => !prev);
//   };

//   const handleShare = () => {
//     if (data.length > 0) {
//       toast.success(`Profile sharing options displayed for ${data[currentProfileIndex].name}`);
//     }
//   };

//   // Guard against accessing data when it's empty
//   const currentProfile = data.length > 0 ? data[currentProfileIndex] : null;
  
//   // Check if user has shown interest in the current profile
//   const hasInterestInCurrentProfile = currentProfile && user?._id && 
//                                      sentInterests.includes(currentProfile._id);
  
  
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-24 pb-16">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col gap-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div>
//                 <h1 className="text-3xl font-medium">Detailed Matrimonial Profiles</h1>
//                 <p className="text-muted-foreground">Browse through our sample matrimonial profiles</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Button variant="outline" onClick={() => navigate('/profiles')}>View All Profiles</Button>
//               </div>
//             </div>

//             {loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <p>Loading profiles...</p>
//               </div>
//             ) : currentProfile ? (
//               <>
//                 <div className="flex justify-between items-center">
//                   <Button variant="outline" onClick={handlePrevious}>
//                     <ArrowLeft className="mr-2 h-4 w-4" />
//                     Previous Profile
//                   </Button>
//                   <span className="text-muted-foreground">Profile {currentProfileIndex + 1} of {data.length}</span>
//                   <Button variant="outline" onClick={handleNext}>
//                     Next Profile
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </div>
//                 <DetailedProfileCard
//                   profile={currentProfile}
//                   onContact={handleContact}
//                   onInterest={handleInterest}
//                   onShare={handleShare}
//                   className="mt-4"
//                 />
//                 <div className="flex gap-4 mt-4">
//                   <Button 
//                     variant={hasInterestInCurrentProfile ? "default" : "outline"} 
//                     onClick={handleChat}
//                   >
//                     {showChat ? "Hide Chat" : "Chat with Profile"}
//                   </Button>
//                   {!hasInterestInCurrentProfile && user?._id && (
//                     <Button variant="default" onClick={handleInterest}>
//                       Show Interest
//                     </Button>
//                   )}
//                 </div>
//                 {showChat && user?._id && currentProfile && (
//                   <div id="chatbox">
//                     <ChatBox
//                       myProfileId={user._id}
//                       otherProfileId={currentProfile._id}
//                       myName={user.name}
//                     />
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="flex justify-center items-center h-64">
//                 <p>No profiles found.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default DetailedProfiles;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DetailedProfileCard, { DetailedProfileData } from '@/components/profile/DetailedProfileCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Bell } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import ChatBox from '@/components/ChatWindow';
import { useAuth } from '@/contexts/AuthContext';
import { getProfileById } from '@/services/profileService';
import { io, Socket } from 'socket.io-client';

// This should match your api.ts configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DetailedProfiles: React.FC = () => {
  const navigate = useNavigate();
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [data, setData] = useState<DetailedProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sentInterests, setSentInterests] = useState<string[]>([]);
  const [receivedInterests, setReceivedInterests] = useState<any[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<{[roomId: string]: number}>({});
  const [showChat, setShowChat] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const { user } = useAuth();

  // Create a memoized room ID only when needed
  const getRoomId = () => {
    if (!user?._id || !data[currentProfileIndex]?._id) return '';
    return [user._id, data[currentProfileIndex]._id].sort().join('-');
  };

  // Initialize socket connection
  useEffect(() => {
    if (!user?._id) return;
    
    const socketInstance = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
    setSocket(socketInstance);
    
    // Listen for new messages
    socketInstance.on('newMessage', (data) => {
      // Check if message is in a room where the current user is a participant
      if (data.room.includes(user._id) && data.senderId !== user._id) {
        // Increment unread count for this room
        setUnreadMessages(prev => ({
          ...prev,
          [data.room]: (prev[data.room] || 0) + 1
        }));
        
        // Update total notification count
        setNotificationCount(prev => prev + 1);
        
        // Show toast notification
        const senderName = data.senderName || 'Someone';
        toast.info(`New message from ${senderName}: ${data.message.substring(0, 30)}${data.message.length > 30 ? '...' : ''}`);
      }
    });
    
    // Listen for new interests
    socketInstance.on('newInterest', (data) => {
      if (data.receiverId === user._id) {
        // Refresh received interests
        fetchReceivedInterests();
        
        // Update notification count
        setNotificationCount(prev => prev + 1);
        
        // Show toast notification
        toast.info(`${data.senderName || 'Someone'} has shown interest in your profile!`);
      }
    });
    
    return () => {
      socketInstance.disconnect();
    };
  }, [user?._id]);

  // Scroll to chat when it's shown
  useEffect(() => {
    if (showChat) {
      const chatElement = document.getElementById('chatbox');
      chatElement?.scrollIntoView({ behavior: 'smooth' });
      
      // Clear unread count for this room when opening chat
      const roomId = getRoomId();
      if (roomId && unreadMessages[roomId]) {
        const currentUnreadCount = unreadMessages[roomId] || 0;
        
        setUnreadMessages(prev => {
          const newState = { ...prev };
          delete newState[roomId];
          return newState;
        });
        
        // Update total notification count
        setNotificationCount(prev => Math.max(0, prev - currentUnreadCount));
      }
    }
  }, [showChat]);

  // Fetch sent interests helper function
  const fetchSentInterests = async () => {
    if (!user?._id) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/interest/sent`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success && response.data.data?.sent) {
        const sentProfileIds = response.data.data.sent.map((interest: any) => {
          return interest.to?.id || interest.to?._id || interest.toProfileId || 
                (typeof interest.to === 'string' ? interest.to : null);
        }).filter(Boolean);
        
        setSentInterests(sentProfileIds);
      }
    } catch (error) {
      console.error('Error refreshing interests:', error);
    }
  };

  // Fetch received interests helper function
  const fetchReceivedInterests = async () => {
    if (!user?._id) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/interest/received`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success && response.data.data?.received) {
        const receivedData = response.data.data.received;
        setReceivedInterests(receivedData);
        
        // Count unread interests (those without viewedAt)
        const unreadInterests = receivedData.filter(
          (interest: any) => !interest.viewedAt
        ).length;
        
        // Calculate total unread message count
        const totalUnreadMessages = Object.values(unreadMessages)
          .reduce((sum: number, count: number) => sum + count, 0);
        
        // Set notification count to unread interests + unread messages
        setNotificationCount(unreadInterests + totalUnreadMessages);
      }
    } catch (error) {
      console.error('Error fetching received interests:', error);
    }
  };

  // Fetch unread messages count
  const fetchUnreadMessagesCount = async () => {
    if (!user?._id) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/messages/unread`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        // Assuming the API returns an object with roomIds as keys and counts as values
        const unreadMessagesData = response.data.data.unreadMessages || {};
        setUnreadMessages(unreadMessagesData);
        
        // Calculate total unread messages
        // const totalUnread = Object.values(unreadMessagesData).length
        //   totalUnread.reduce((sum: number, count: number) => sum + (count as number), 0);
        let totalUnread = 0;
      Object.keys(unreadMessagesData).forEach(key => {
        totalUnread += Number(unreadMessagesData[key]) || 0;
      });

        // Add to notification count
        setNotificationCount(prev => prev + totalUnread);
      }
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    }
  };

  // Fetch profiles and interests on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Make sure this path is correct based on your API structure
        const response = await axios.get(`${API_URL}/registerdetails/registerdetails`);
        if (Array.isArray(response.data)) {
         console.log('Fetched profiles:', response.data);
          setData(response.data);
        } else {
          console.error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
    fetchSentInterests();
    fetchReceivedInterests();
    fetchUnreadMessagesCount();
  }, [user?._id]);

  const handlePrevious = () => {
    if (data.length > 0) {
      setCurrentProfileIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
      setShowChat(false);
    }
  };

  const handleNext = () => {
    if (data.length > 0) {
      setCurrentProfileIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
      setShowChat(false);
    }
  };

  const handleContact = () => {
    if (data.length > 0) {
      toast.success(`Contact request sent to ${data[currentProfileIndex].name}`);
    }
  };

  const handleInterest = async () => {
    if (!user?._id) {
      toast.error('Please login to show interest');
      return;
    }
    
    if (data.length === 0) return;
    
    const profileId = data[currentProfileIndex]._id;
    
    // Check if interest already sent
    if (sentInterests.includes(profileId)) {
      toast.info(`You have already shown interest in ${data[currentProfileIndex].name}'s profile`);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Corrected API path for sending interest
      const response = await axios.post(
        `${API_URL}/interest/send`, 
        {
          senderId: user._id,
          receiverId: profileId,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        // Immediately update local state
        setSentInterests(prev => [...prev, profileId]);
        toast.success(`Interest shown in ${data[currentProfileIndex].name}'s profile`);
        
        // Also refresh interests from server to ensure consistency
        setTimeout(() => {
          fetchSentInterests();
        }, 500);
      } else {
        toast.error(response.data.message || 'Failed to send interest');
      }
    } catch (error: any) {
      console.error('Error sending interest:', error);
      toast.error(error.response?.data?.message || 'Failed to send interest. Please try again.');
    }
  };

  const handleChat = () => {
    if (!user?._id) {
      toast.error('Please login to chat with profiles');
      return;
    }
    
    if (data.length === 0) return;
    
    const profileId = data[currentProfileIndex]._id;
    
    // Check if interest has been sent
    if (!sentInterests.includes(profileId)) {
      toast.info('Please show interest in the profile to start chat.');
      return;
    }
    
    // Toggle chat window
    setShowChat(prev => !prev);
  };

  const handleShare = () => {
    if (data.length > 0) {
      toast.success(`Profile sharing options displayed for ${data[currentProfileIndex].name}`);
    }
  };

  const handleViewNotifications = () => {
    navigate('/notifications');
  };

  // Guard against accessing data when it's empty
  const currentProfile = data.length > 0 ? data[currentProfileIndex] : null;
  
  // Check if user has shown interest in the current profile
  const hasInterestInCurrentProfile = currentProfile && user?._id && 
                                     sentInterests.includes(currentProfile._id);
  
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-medium">Detailed Matrimonial Profiles</h1>
                <p className="text-muted-foreground">Browse through our sample matrimonial profiles</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleViewNotifications}
                  className="relative"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                </Button>
                <Button variant="outline" onClick={() => navigate('/profiles')}>View All Profiles</Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading profiles...</p>
              </div>
            ) : currentProfile ? (
              <>
                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={handlePrevious}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Profile
                  </Button>
                  <span className="text-muted-foreground">Profile {currentProfileIndex + 1} of {data.length}</span>
                  <Button variant="outline" onClick={handleNext}>
                    Next Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <DetailedProfileCard
                  profile={currentProfile}
                  onContact={handleContact}
                  onInterest={handleInterest}
                  onShare={handleShare}
                  className="mt-4"
                />
                <div className="flex gap-4 mt-4">
                  <Button 
                    variant={hasInterestInCurrentProfile ? "default" : "outline"} 
                    onClick={handleChat}
                    className="relative"
                  >
                    {showChat ? "Hide Chat" : "Chat with Profile"}
                    {!showChat && unreadMessages[getRoomId()] > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                        {unreadMessages[getRoomId()]}
                      </span>
                    )}
                  </Button>
                  {!hasInterestInCurrentProfile && user?._id && (
                    <Button variant="default" onClick={handleInterest}>
                      Show Interest
                    </Button>
                  )}
                </div>
                {showChat && user?._id && currentProfile && (
                  <div id="chatbox">
                    <ChatBox
                      myProfileId={user._id}
                      otherProfileId={currentProfile._id}
                      myName={user.name}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p>No profiles found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailedProfiles;