import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/layout/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, RefreshCcw, Info } from 'lucide-react';
import axios from 'axios';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().optional(), // Add name as an optional field
  id: z.string().optional(), // Add id as an optional field
});

// Define LoginFormData interface
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean; // Optional field
}


interface LoginResponse {
  error?: string;
  [key: string]: any; // For any other properties returned from the backend
}

const Login = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [demoMode, setDemoMode] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // // Check if we're in demo mode
  // useEffect(() => {
  //   const apiUrl = import.meta.env.VITE_API_URL || '';
  //   const isDemo = !apiUrl.includes('localhost');
  //   setDemoMode(isDemo);
  //   console.log('Demo mode:', isDemo);
  // }, []);

  // Reset lockout state
  const resetLockout = () => {
    setFailedAttempts(0);
    sessionStorage.removeItem('failedLoginAttempts');
    setIsLocked(false);
    sessionStorage.removeItem('loginLockUntil');
    toast({
      title: "Lockout Reset",
      description: "Account lockout has been reset",
    });
  };

  useEffect(() => {
    const savedAttempts = sessionStorage.getItem('failedLoginAttempts');
    const lockUntil = sessionStorage.getItem('loginLockUntil');
    
    if (savedAttempts) {
      setFailedAttempts(parseInt(savedAttempts));
    }
    
    if (lockUntil) {
      const lockTime = parseInt(lockUntil);
      if (lockTime > Date.now()) {
        setIsLocked(true);
        const remainingTime = Math.ceil((lockTime - Date.now()) / 1000);
        setLockTimer(remainingTime);
      } else {
        sessionStorage.removeItem('loginLockUntil');
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer(prev => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            setIsLocked(false);
            sessionStorage.removeItem('loginLockUntil');
            clearInterval(interval);
          }
          return newValue;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLocked, lockTimer]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLocked) return;
    
    setIsLoading(true);
    setDebugInfo(null);
    
    try {
      console.log('Attempting login with:', values.email);
      const apiUrl = import.meta.env.VITE_API_URL || 'Using demo server';
      console.log('API URL:', apiUrl);
      
      // Always reset lockout for admin login
      if (values.email === 'admin@example.com') {
        console.log('Using admin credentials');
        setFailedAttempts(0);
        sessionStorage.removeItem('failedLoginAttempts');
        setIsLocked(false);
        sessionStorage.removeItem('loginLockUntil');
      }
      
      const res = await login({
        email: values.email,
        password: values.password,
      });
      
      setFailedAttempts(0);
      sessionStorage.removeItem('failedLoginAttempts');
      
      toast({
        title: "Login Successful",
        description: demoMode ? "You're using demo mode with simulated data" : "Welcome back!",
      });
      
      const response = await axios.post('http://localhost:5000/api/login', {
        email: values.email,
        password: values.password,
      });

      
      //   localStorage.setItem('registrationId', response.data.registrationId);

      //   // Optionally, you could store other information like the token, user ID, etc.
      //   localStorage.setItem('userToken', response.data.token);
      //     localStorage.setItem('LoginData', JSON.stringify({ email: values.email, name: values.name, id: values.id })); 
            
      // if (isAdmin) {
      //   navigate('/admin');
      // } else {
      //   navigate('/dashboard');
      // }
      
      
    } catch (error: any) {
      console.error('Login error:', error);
      setDebugInfo({
        message: error.message,
        status: error.status || error.response?.status,
        data: error.response?.data
      });
      
      // Skip lockout for admin
      if (values.email === 'admin@example.com') {
        toast({
          title: 'Admin Login Failed',
          description: 'There was an issue with the admin login. Please check the console for more details.',
          variant: 'destructive',
        });
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        sessionStorage.setItem('failedLoginAttempts', newAttempts.toString());
        
        if (newAttempts >= 5) {
          const lockDuration = 2 * 60 * 1000;
          const lockUntil = Date.now() + lockDuration;
          setIsLocked(true);
          setLockTimer(lockDuration / 1000);
          sessionStorage.setItem('loginLockUntil', lockUntil.toString());
          toast({
            title: 'Account Temporarily Locked',
            description: `Too many failed attempts. Please try again in ${Math.ceil(lockDuration / 60000)} minutes.`,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Login Failed',
            description: `Invalid email or password. ${5 - newAttempts} attempts remaining.`,
            variant: 'destructive',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const useAdminCredentials = () => {
    // Reset failed attempts counter when using admin credentials
    setFailedAttempts(0);
    sessionStorage.removeItem('failedLoginAttempts');
    setIsLocked(false);
    sessionStorage.removeItem('loginLockUntil');
    
    form.setValue('email', 'admin@example.com');
    form.setValue('password', 'admin123');
    console.log('Admin credentials set');
  };

  const useTestUserCredentials = () => {
    setFailedAttempts(0);
    sessionStorage.removeItem('failedLoginAttempts');
    setIsLocked(false);
    sessionStorage.removeItem('loginLockUntil');
    
    form.setValue('email', 'user@example.com');
    form.setValue('password', 'password123');
    console.log('Test user credentials set');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Link to="/">
                <span className="flex items-center space-x-2">
                  <span className="text-2xl text-primary">PBST</span>
                  <span className="text-lg font-normal">Rishte-Nate</span>
                </span>
              </Link>
            </div>
            <CardTitle className="text-2xl text-center">Login to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoMode && (
              <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Running in demo mode. Use the buttons below for sample credentials.
                </AlertDescription>
              </Alert>
            )}
            
            {isLocked && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>
                    Account temporarily locked due to too many failed attempts. 
                    Please try again in {Math.floor(lockTimer / 60)}:{(lockTimer % 60).toString().padStart(2, '0')}.
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetLockout}
                    className="ml-2"
                  >
                    <RefreshCcw className="h-3 w-3 mr-1" /> Reset
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            
            {failedAttempts >= 3 && failedAttempts < 5 && (
              <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Warning: Your account will be temporarily locked after {5 - failedAttempts} more failed attempts.
                </AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="example@email.com" 
                          {...field} 
                          disabled={isLoading || isLocked}
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="******" 
                          {...field} 
                          disabled={isLoading || isLocked}
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || isLocked}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>

            {debugInfo && (
              <Alert variant="default" className="bg-slate-50 text-slate-800 border-slate-200 text-xs">
                <details>
                  <summary className="font-semibold cursor-pointer">Debug Info (click to expand)</summary>
                  <pre className="mt-2 overflow-auto max-h-32 p-2 bg-slate-100 rounded">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </details>
              </Alert>
            )}
            
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Demo Accounts</span>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={useAdminCredentials}
                disabled={isLocked}
              >
                <Shield className="h-4 w-4" />
                Admin Login
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={useTestUserCredentials}
                disabled={isLocked}
              >
                <Shield className="h-4 w-4" />
                User Login
              </Button>
            </div>
          </CardContent> */}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground mt-2">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
