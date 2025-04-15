import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Filter, MoreVertical, Trash2, Edit, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import AdminNavbar from '@/components/layout/AdminNavbar';
import AdminSidebar from '@/components/layout/AdminSidebar';

const UserManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Mock user data - would be fetched from API in real app
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', lastLogin: '2023-05-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active', lastLogin: '2023-05-16' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'user', status: 'inactive', lastLogin: '2023-04-20' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'user', status: 'active', lastLogin: '2023-05-14' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'user', status: 'active', lastLogin: '2023-05-10' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'user', status: 'inactive', lastLogin: '2023-03-22' },
  ]);

  // Filter users based on search query and active status
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!showInactive) {
      return matchesSearch && user.status === 'active';
    }
    
    return matchesSearch;
  });

  const handleDeleteUser = (userId) => {
    // In a real app, this would make an API call
    setUsers(users.filter(user => user.id !== userId));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted.",
    });
  };

  const handleToggleUserStatus = (userId) => {
    // In a real app, this would make an API call
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        return { ...user, status: newStatus };
      }
      return user;
    }));
    
    toast({
      title: "User status updated",
      description: "The user's status has been updated successfully.",
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="ml-56 w-full">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-inactive"
                    checked={showInactive}
                    onCheckedChange={setShowInactive}
                  />
                  <Label htmlFor="show-inactive">Show inactive users</Label>
                </div>
                
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
                
                <Button size="sm" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  <span>Add User</span>
                </Button>
              </div>
            </div>
            
            {/* Users table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? "default" : "outline"}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.status === 'active' ? (
                            <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                              <XCircle className="h-3 w-3 mr-1" />
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit user
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                                {user.status === 'active' ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete user
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Delete confirmation dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete the user "{selectedUser?.name}"? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDeleteUser(selectedUser?.id)}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
