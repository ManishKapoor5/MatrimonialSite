import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [receivedInterests, setReceivedInterests] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('interests');

  useEffect(() => {
    if (!user?._id) {
      navigate('/login');
      return;
    }
    
    fetchReceivedInterests();
    fetchRecentMessages();
  }, [user?._id]);

  const fetchReceivedInterests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/interest/received`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success && response.data.data?.received) {
        // Mark all as viewed when fetching
        const viewedResponse = await axios.post(
          `${API_URL}/interest/markViewed`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setReceivedInterests(response.data.data.received);
      }
    } catch (error) {
      console.error('Error fetching received interests:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/messages/recent`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setMessages(response.data.data.messages || []);
        
        // Mark all messages as read
        await axios.post(
          `${API_URL}/messages/markRead`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error('Error fetching recent messages:', error);
    }
  };

  const handleViewProfile = (profileId: string) => {
    navigate(`/profile/${profileId}`);
  };

  const handleStartChat = (profileId: string) => {
    navigate(`/chat/${profileId}`);
  };

  const renderEmptyState = (type: 'interests' | 'messages') => (
    <div className="flex flex-col items-center justify-center py-12">
      {type === 'interests' ? (
        <>
          <Heart className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No interests yet</h3>
          <p className="text-muted-foreground text-center max-w-md mt-2">
            When someone shows interest in your profile, it will appear here.
          </p>
        </>
      ) : (
        <>
          <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No messages yet</h3>
          <p className="text-muted-foreground text-center max-w-md mt-2">
            When someone sends you a message, it will appear here.
          </p>
        </>
      )}
      <Button 
        variant="outline" 
        className="mt-6"
        onClick={() => navigate('/profiles')}
      >
        Browse Profiles
      </Button>
    </div>
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-medium">My Notifications</h1>
              <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full max-w-md mx-auto">
                <TabsTrigger value="interests" className="flex-1">
                  Interests {receivedInterests.length > 0 && `(${receivedInterests.length})`}
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex-1">
                  Messages {messages.length > 0 && `(${messages.length})`}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="interests" className="mt-6">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <p>Loading interests...</p>
                  </div>
                ) : receivedInterests.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {receivedInterests.map((interest) => (
                      <Card key={interest._id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                          <Avatar>
                            <AvatarImage 
                              src={interest.from?.profilePicture || ''} 
                              alt={interest.from?.name || 'User'} 
                            />
                            <AvatarFallback>
                              {getInitials(interest.from?.name || 'User')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{interest.from?.name || 'User'}</CardTitle>
                            <CardDescription>
                              {interest.createdAt ? format(new Date(interest.createdAt), 'PPp') : 'Recently'}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p>
                            {interest.from?.name || 'Someone'} has shown interest in your profile.
                          </p>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button 
                            variant="default" 
                            onClick={() => handleViewProfile(interest.from?._id)}
                          >
                            View Profile
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handleStartChat(interest.from?._id)}
                          >
                            Start Chat
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  renderEmptyState('interests')
                )}
              </TabsContent>
              
              <TabsContent value="messages" className="mt-6">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <p>Loading messages...</p>
                  </div>
                ) : messages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {messages.map((message) => (
                      <Card key={message._id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                          <Avatar>
                            <AvatarImage 
                              src={message.sender?.profilePicture || ''} 
                              alt={message.sender?.name || 'User'} 
                            />
                            <AvatarFallback>
                              {getInitials(message.sender?.name || 'User')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{message.sender?.name || 'User'}</CardTitle>
                            <CardDescription>
                              {message.createdAt ? format(new Date(message.createdAt), 'PPp') : 'Recently'}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-3">{message.content}</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="default" 
                            onClick={() => handleStartChat(message.sender?._id)}
                            className="w-full"
                          >
                            Reply
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  renderEmptyState('messages')
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;