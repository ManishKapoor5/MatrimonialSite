
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Heart, Calendar, Clock, Bell, MessageSquare, UserCheck } from 'lucide-react';
import { getUserPersonalLogs } from '@/services/userService';
import { Layout } from '@/components/layout/Layout';
import RoleBadge from '@/components/auth/RoleBadge';
import LogoutConfirmDialog from '@/components/auth/LogoutConfirmDialog';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const logs = await getUserPersonalLogs();
        setActivityLogs(logs);
      } catch (error) {
        console.error('Failed to fetch user logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLogs();
  }, []);

  // Mock data for the dashboard
  const recentMatches = [
    { id: 1, name: "Priya Sharma", date: "2 days ago", compatibility: "85%" },
    { id: 2, name: "Ankit Patel", date: "1 week ago", compatibility: "78%" },
    { id: 3, name: "Meera Joshi", date: "2 weeks ago", compatibility: "73%" }
  ];

  const upcomingEvents = [
    { id: 1, title: "Virtual Matrimony Meet", date: "May 15, 2023", time: "6:00 PM" },
    { id: 2, title: "Profile Verification Call", date: "May 18, 2023", time: "11:00 AM" }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
          <div className="flex items-center mt-2">
            <RoleBadge role={user?.role || 'user'} />
            <p className="text-muted-foreground ml-2">{user?.email}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <LogoutConfirmDialog />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {/* Stats Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Matches Received</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  3 new this week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  Add more details to reach 100%
                </p>
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-rose-500" />
                  Recent Matches
                </CardTitle>
                <CardDescription>
                  Profiles that may be a good match for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[240px]">
                  <div className="space-y-4">
                    {recentMatches.map((match) => (
                      <div key={match.id} className="flex justify-between items-start pb-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">{match.name}</p>
                          <p className="text-sm text-muted-foreground">Matched {match.date}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-green-600">{match.compatibility}</span>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Matches</Button>
              </CardFooter>
            </Card>

            {/* Upcoming Events */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[240px]">
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="pb-3 border-b last:border-0">
                        <p className="font-medium">{event.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{event.date}</span>
                          <Clock className="h-3 w-3 ml-3 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Calendar</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Your Matches</CardTitle>
              <CardDescription>
                View and manage your potential matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-10 text-center text-muted-foreground">
                Your detailed matches would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent activities and interactions on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="py-10 text-center text-muted-foreground">Loading activity logs...</p>
              ) : activityLogs.length > 0 ? (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {/* Render the activity logs here */}
                    <p className="py-10 text-center text-muted-foreground">
                      Your activity logs would appear here
                    </p>
                  </div>
                </ScrollArea>
              ) : (
                <p className="py-10 text-center text-muted-foreground">
                  No recent activity found
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Your Preferences</CardTitle>
              <CardDescription>
                Manage your profile preferences and matching criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-10 text-center text-muted-foreground">
                Your preference settings would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
