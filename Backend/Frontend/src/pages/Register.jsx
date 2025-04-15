import React, { useState, useEffect, ChangeEvent } from 'react';
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
import { registerUser } from '@/services/userService';
import Footer from '@/components/layout/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom.js";
import useShowToast from "../hooks/useShowToast.tsx";
import userAtom from "../atoms/userAtom.js";

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    const isDemo = !apiUrl.includes('localhost');
    setDemoMode(isDemo);
    console.log('Demo mode:', isDemo);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSignup = async () => {
  //   try {
  //     const res = await fetch("/api/users/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(inputs),
  //     });
  //     const data = await res.json();

  //     if (data.error) {
  //       showToast("Error", data.error, "error");
  //       return;
  //     }

  //     localStorage.setItem("user-threads", JSON.stringify(data));
  //     setUser(data);
  //   } catch (error) {
  //     showToast("Error", error.message || "Something went wrong", "error");
  //   }
  // };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values) => {
  setIsLoading(true);
  try {
    const response = await registerUser({
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    });

    // ✅ Save userId in localStorage
    if (response?.userId) {
      localStorage.setItem("userId", response.userId);
    }

    toast({
      title: 'Registration Successful',
      description: demoMode 
        ? 'Your demo account has been created. Please log in.' 
        : 'Your account has been created. Please log in.',
    });

    navigate('/detailsSubmission');
  } catch (error) {
    console.error('Registration error:', error);
    toast({
      title: 'Registration Failed',
      description: 'Could not create your account. Please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsLoading(false);
  }
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
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to register
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoMode && (
              <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Running in demo mode. Your registration will be stored locally.
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="1234567890" 
                          {...field} 
                          disabled={isLoading}
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
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="******" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Register'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
