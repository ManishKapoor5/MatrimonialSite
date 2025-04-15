import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, loginUser, logoutUser, LoginFormData, isLoggedIn } from '@/services/userService';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isActive: boolean;
  images?: string;
  registrationId?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isUser: boolean;
  isAuthenticated: boolean;
  checkPermission: (requiredRoles: string[]) => boolean;
  userRole: string | null;
  images?: string;
  lastActivity: Date;
  updateLastActivity: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_TIMEOUT_MINUTES = 30;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState<Date>(new Date());
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Update last activity
  const updateLastActivity = () => {
    setLastActivity(new Date());
    localStorage.setItem('lastActivity', new Date().toISOString());
  };

  // Check for session timeout
  useEffect(() => {
    const activityCheck = setInterval(() => {
      if (user) {
        const now = new Date();
        const diffMs = now.getTime() - lastActivity.getTime();
        const diffMinutes = Math.floor(diffMs / 60000);
        
        if (diffMinutes >= SESSION_TIMEOUT_MINUTES) {
          console.log('Session timeout detected');
          toast({
            title: "Session Expired",
            description: "Your session has timed out due to inactivity.",
            variant: "destructive"
          });
          logout();
        }
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(activityCheck);
  }, [user, lastActivity]);

  // Update last activity on user actions
  useEffect(() => {
    const handleActivity = () => updateLastActivity();
    
    // Throttle the activity updates to avoid excessive state updates
    let timeout: number | null = null;
    const throttledHandleActivity = () => {
      if (!timeout) {
        timeout = window.setTimeout(() => {
          // handleActivity();
          timeout = null;
        }, 1000); // Update at most once per second
      }
    };
    
    window.addEventListener('click', throttledHandleActivity);
    window.addEventListener('keypress', throttledHandleActivity);
    window.addEventListener('scroll', throttledHandleActivity);
    window.addEventListener('mousemove', throttledHandleActivity);
    
    return () => {
      window.removeEventListener('click', throttledHandleActivity);
      window.removeEventListener('keypress', throttledHandleActivity);
      window.removeEventListener('scroll', throttledHandleActivity);
      window.removeEventListener('mousemove', throttledHandleActivity);
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  // Restore last activity from localStorage on page reload
  useEffect(() => {
    const storedLastActivity = localStorage.getItem('lastActivity');
    if (storedLastActivity) {
      setLastActivity(new Date(storedLastActivity));
    }
  }, []);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUser = async () => {
      if (isLoggedIn()) {
        try {
          console.log('User has token, fetching user data');
          const userData = await getCurrentUser();
          
          // Check if the user account is active
          if (!userData.isActive) {
            console.log('Account disabled:', userData.email);
            toast({
              title: "Account Disabled",
              description: "Your account has been disabled. Please contact support.",
              variant: "destructive"
            });
            await logoutUser();
            localStorage.removeItem('token');
            localStorage.removeItem('lastActivity');
            setUser(null);
          } else {
            setUser(userData);
            console.log('User data set:', userData);
            updateLastActivity();
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Clear invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('lastActivity');
        }
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  // const login = async (data: LoginFormData) => {
  //   setLoading(true);
  //   try {
  //     console.log('AuthContext: Login attempt for', data.email);
  //     const response = await loginUser(data);
      
  //     if (response.success) {
  //       console.log('Login successful, fetching user data');
  //       const userData = await getCurrentUser();
        
  //       // Check if the user account is active
  //       if (!userData.isActive) {
  //         console.log('Account disabled, preventing login:', userData.email);
  //         toast({
  //           title: "Account Disabled",
  //           description: "Your account has been disabled. Please contact support.",
  //           variant: "destructive"
  //         });
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('lastActivity');
  //         return;
  //       }
        
  //       setUser(userData);
  //       console.log('User set after login:', userData);
  //       updateLastActivity();
        
  //       toast({
  //         title: "Login Successful",
  //         description: `Welcome back, ${userData.name}!`,
  //       });

  //       // Redirect to appropriate dashboard based on role
  //       if (userData.role === 'admin') {
  //         console.log(`Admin login: ${userData.email}`);
  //         navigate('/admin/dashboard');
  //       } 
  //        if (userData.role === 'user') {
  //         console.log(`User login: ${userData.email}`);
  //         navigate('/myprofile');
  //       }else {
  //         navigate('/myprofile');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Login failed in auth context:', error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const login = async (data: LoginFormData) => {
  setLoading(true);
  try {
    console.log('AuthContext: Login attempt for', data.email);
    const response = await loginUser(data);

    if (response.success) {
      console.log('Login successful, fetching user data');
      const userData = await getCurrentUser();
      console.log('User data fetched:', userData);
      
      // Check if the user account is active
      if (!userData.isActive) {
        console.log('Account disabled, preventing login:', userData.email);
        toast({
          title: "Account Disabled",
          description: "Your account has been disabled. Please contact support.",
          variant: "destructive"
        });
        localStorage.removeItem('token');
        localStorage.removeItem('lastActivity');
        navigate('/login');
        return;
      }

      setUser(userData);
      console.log('User set after login:', userData);
      updateLastActivity();
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });

      // Check the role and log which route is being redirected to
      if (userData.role === 'admin') {
        console.log('Admin login detected, redirecting to admin dashboard');
        navigate('/admin/dashboard');
      } else if (userData.role === 'user') {
        console.log('User login detected, redirecting to user profile');
        navigate('/myprofile');
      } else {
        console.log('Unknown role, redirecting to user profile');
        navigate('/myprofile');
      }
    }
  } catch (error) {
    console.error('Login failed in auth context:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('lastActivity');
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Ensure the user is still logged out locally even if the API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('lastActivity');
      setUser(null);
      toast({
        title: "Logout Issue",
        description: "There was a problem logging out, but your local session has been cleared.",
      });
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  // Role-based permissions check
  const checkPermission = (requiredRoles: string[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';
  const isAuthenticated = !!user;
  const userRole = user?.role || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
        isUser,
        setUser,
        isAuthenticated,
        checkPermission,
        userRole,
        lastActivity,
        updateLastActivity
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};