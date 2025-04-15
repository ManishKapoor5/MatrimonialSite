import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Settings, Activity, ChartBar, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RoleBadge from '@/components/auth/RoleBadge';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminNavbar from '@/components/layout/AdminNavbar';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [profileCount, setProfileCount] = useState();
  const [stats] = useState({
    totalUsers: 152,
    activeUsers: 118,
    inactiveUsers: 34,
    newRegistrations: 12,
    systemErrors: 3,
    pendingApprovals: 8,  
    totalProfiles: 15782,
    recentAdditions: 48,
    pendingReviews: 12,
    matchesCreated: 126,
  
  });

  useEffect(() => {
  const fetchProfileCount = async () => {
    const res = await fetch('http://localhost:5000/api/profiles/count');
    const data = await res.json();
    setProfileCount(data.count); // useState hook use karo
  };
  fetchProfileCount();
}, []);


  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="ml-56 w-full">
          <div className="container mx-auto px-6 py-8">
            {/* Admin Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <div className="flex items-center mt-2">
                <RoleBadge role="admin" />
                <p className="text-muted-foreground ml-2">{user?.email}</p>
              </div>
            </div>

            {/* Admin Tabs */}
            <Tabs defaultValue="overview" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                {/* <TabsTrigger value="logs">Activity Logs</TabsTrigger> */}
              </TabsList>
              
              
              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-card border border-border/60 rounded-lg p-5 hover:border-primary/20 transition-colors card-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Profiles</p>
                    <h3 className="text-2xl font-semibold mt-1">{profileCount}</h3>
                  </div>
                  <div className="p-2 rounded-md bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="text-green-600 font-medium">+{stats.recentAdditions}</span> new this week
                </div>
              </div>
              
              <div className="bg-card border border-border/60 rounded-lg p-5 hover:border-primary/20 transition-colors card-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                    <h3 className="text-2xl font-semibold mt-1">{stats.pendingReviews}</h3>
                  </div>
                  <div className="p-2 rounded-md bg-yellow-500/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Profiles waiting for approval
                </div>
              </div>
              
              <div className="bg-card border border-border/60 rounded-lg p-5 hover:border-primary/20 transition-colors card-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Groups</p>
                    <h3 className="text-2xl font-semibold mt-1">17</h3>
                  </div>
                  <div className="p-2 rounded-md bg-blue-500/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  WhatsApp groups connected
                </div>
              </div>
              
              <div className="bg-card border border-border/60 rounded-lg p-5 hover:border-primary/20 transition-colors card-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Matches Created</p>
                    <h3 className="text-2xl font-semibold mt-1">{stats.matchesCreated}</h3>
                  </div>
                  <div className="p-2 rounded-md bg-green-500/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="text-green-600 font-medium">+14</span> in the last month
                </div>
              </div>
            </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                  {/* Stats Cards */}
                  
                  {/* <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalUsers}</div>
                      <p className="text-xs text-muted-foreground">
                        {stats.activeUsers} active, {stats.inactiveUsers} inactive
                      </p>
                    </CardContent>
                  </Card> */}
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.newRegistrations}</div>
                      <p className="text-xs text-muted-foreground">
                        Last 7 days
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">System Errors</CardTitle>
                      <Shield className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.systemErrors}</div>
                      <p className="text-xs text-destructive">
                        Needs attention
                      </p>
                    </CardContent>
                  </Card>
                   */}
                  {/* <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-primary" />
                        System Activity
                      </CardTitle>
                      <CardDescription>
                        Recent system events and actions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">Activity chart would appear here</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View All Activities</Button>
                    </CardFooter>
                  </Card> */}
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-amber-500" />
                        Pending Approvals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[150px] flex flex-col justify-center items-center">
                        <div className="text-4xl font-bold text-amber-500">{stats.pendingApprovals}</div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Items awaiting approval
                        </p>
                        <Button className="mt-4" size="sm">Review Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Quick Actions
                <div className="mt-8">
                  <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Users className="h-5 w-5 mb-2" />
                      <span>Manage Users</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Settings className="h-5 w-5 mb-2" />
                      <span>System Settings</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <Activity className="h-5 w-5 mb-2" />
                      <span>View Logs</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                      <ChartBar className="h-5 w-5 mb-2" />
                      <span>Reports</span>
                    </Button>
                  </div>
                </div> */}
              </TabsContent>
              
              {/* Users Tab */}
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      View and manage all user accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="py-10 text-center text-muted-foreground">
                      User management interface would appear here. You can view the full interface in the User Management page.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <a href="/admin/users">Go to User Management</a>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* System Tab */}
              <TabsContent value="system">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>
                      Configure system settings and parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Email Configuration</h3>
                        <p className="text-muted-foreground text-sm">Configure email settings for system notifications</p>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Security Settings</h3>
                        <p className="text-muted-foreground text-sm">Configure password policies and security measures</p>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">API Integrations</h3>
                        <p className="text-muted-foreground text-sm">Manage third-party API integrations</p>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Logs Tab */}
              <TabsContent value="logs">
                <Card>
                  <CardHeader>
                    <CardTitle>System Logs</CardTitle>
                    <CardDescription>
                      View system activity and error logs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="py-10 text-center text-muted-foreground">
                      System logs interface would appear here. You can view the full interface in the System Logs page.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <a href="/admin/logs">View All Logs</a>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
