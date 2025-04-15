
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  allowedRoles?: ('user' | 'admin')[];
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles = ['user', 'admin'],
  requireAuth = true
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  // Check role permissions outside of render using useEffect
  useEffect(() => {
    // Only show toast when we're sure about authentication state and there's a permission issue
    if (!loading && requireAuth && isAuthenticated && user && !allowedRoles.includes(user.role)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
    }
  }, [loading, isAuthenticated, user, requireAuth, allowedRoles, toast]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }
  
  // Handle authentication requirement
  if (requireAuth && !isAuthenticated) {
    // Store the location they tried to access for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Handle already authenticated users trying to access login/register pages
  if (!requireAuth && isAuthenticated) {
    // If they're already logged in and trying to access login/register, redirect them
    if (['/login', '/register'].includes(location.pathname)) {
      const redirectPath = user?.role === 'admin' ? '/admin' : '/dashboard';
      return <Navigate to={redirectPath} replace />;
    }
  }
  
  // Check role permissions - without triggering toast here as it's now in useEffect
  if (requireAuth && user && !allowedRoles.includes(user.role)) {
    const redirectPath = user?.role === 'admin' ? '/admin' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }
  
  // User is authenticated and authorized (or page doesn't require auth)
  return <Outlet />;
};

export default ProtectedRoute;
