
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { SocketContextProvider } from "@/contexts/SocketContext";

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register.jsx';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import UserManagement from '@/pages/UserManagement';
import AdminLogs from '@/pages/AdminLogs';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import Profiles from '@/pages/Profiles';
import Search from '@/pages/Search';
import DetailedProfiles from '@/pages/DetailedProfiles';
import MyProfile from '@/pages/MyProfile';
import UserRegistration from './pages/UserRegistration';
import { RecoilRoot } from "recoil";
import { useRecoilValue } from "recoil";
import userAtom from "@/atoms/userAtom.js";
import ChatPage from "@/pages/ChatPage.jsx";
import AuthPage from "@/pages/AuthPage.js";
import ProfileDetailPage from './pages/ProfileDetailPage';
import Premium from './pages/Premium';
import Notifications from './components/Notifications';

function App() {
  const user = useRecoilValue(userAtom);
  return (
    
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
           <SocketContextProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detailsSubmission" element={<UserRegistration />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<ProfileDetailPage />} />
            <Route path="/detailed-profiles" element={<DetailedProfiles />} />
            <Route path="/search" element={<Search />} />
            <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
            <Route path='/chat' element={ <ChatPage />} />
            <Route path='/notifications' element={ <Notifications />} />
            <Route path='/upgrade' element={<Premium />} />
            
            {/* Public routes */}
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/logs" element={<AdminLogs />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          </SocketContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
    
  );
}

export default App;
