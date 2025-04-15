
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { updateUserProfile, changePassword, getUserPersonalLogs } from "@/services/userService";
import { Layout } from "@/components/layout/Layout";
import { 
  User, 
  KeyRound, 
  History, 
  Save, 
  XCircle,
  AlertCircle 
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Settings = () => {
  const { user, updateLastActivity } = useAuth();
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [userLogs, setUserLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  // Load user data when component mounts
  useEffect(() => {
    updateLastActivity();
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
    
    // Load user activity logs
    const fetchUserLogs = async () => {
      try {
        const logs = await getUserPersonalLogs();
        setUserLogs(logs);
      } catch (error) {
        console.error("Failed to fetch user logs:", error);
      }
    };
    
    fetchUserLogs();
  }, [user, updateLastActivity]);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    setPasswordError("");
  };
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateUserProfile(profileForm);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate password
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords don't match");
      setIsLoading(false);
      return;
    }
    
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      
      // Clear form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
    } catch (error: any) {
      toast({
        title: "Password Change Failed",
        description: error.response?.data?.message || "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <KeyRound className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <History className="h-4 w-4" /> Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={profileForm.name} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={profileForm.email} 
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profileForm.phone} 
                      onChange={handleProfileChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      if (user) {
                        setProfileForm({
                          name: user.name || "",
                          email: user.email || "",
                          phone: user.phone || "",
                        });
                      }
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" /> Reset
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" /> {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your account password
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordSubmit}>
                <CardContent className="space-y-4">
                  {passwordError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword" 
                      type="password" 
                      value={passwordForm.currentPassword} 
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword" 
                      type="password" 
                      value={passwordForm.newPassword} 
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      value={passwordForm.confirmPassword} 
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters and include uppercase, lowercase, and numbers.
                  </p>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Account Activity</CardTitle>
                <CardDescription>
                  Recent account activities and login history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userLogs.length > 0 ? (
                    userLogs.map((log, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">{log.action}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No recent account activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
