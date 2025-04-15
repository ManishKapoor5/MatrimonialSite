import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
// Create axios instance with better fallback for API URL
//const API_URL = import.meta.env.VITE_API_URL || 'https://pbst-matrimonial-api.onrender.com/api';
const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // Add timeout to prevent long waiting for response
});

console.log('API configured with baseURL:', API_URL);

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    console.log('API Request URL:', config.baseURL + config.url);
    console.log('API Request Method:', config.method?.toUpperCase());
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token added to request headers');
    } else {
      console.log('No token available');
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);



// Determine base URL safely (client-side only)
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}/api`;
  }
  return 'http://localhost:5000/api'; // fallback for server-side or testing
};

// // Create an axios instance
// const api = axios.create({
//   baseURL: getBaseURL(),
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const chatApi = {
//   getMessages: async (senderId: string, receiverId: string): Promise<Message[]> => {
//     try {
//       const response = await api.get(`/chat/messages/${senderId}/${receiverId}`);
//       return response.data.messages;
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       return [];
//     }
//   },

//   sendMessage: async (
//     senderId: string,
//     receiverId: string,
//     message: string
//   ): Promise<Message> => {
//     try {
//       const response = await api.post('/chat/send', {
//         senderId,
//         receiverId,
//         message,
//       });
//       return response.data.chat;
//     } catch (error) {
//       console.error('Error sending message:', error);
//       throw error;
//     }
//   },
// };
// // Handle response errors
// api.interceptors.response.use(
//   (response) => {
//     console.log('API Response:', response.status, response.data);
//     return response;
//   },
//   (error) => {
//     const { response } = error;
    
//     if (response) {
//       console.error('API Error:', 
//         `Status: ${response.status}, Message: ${response.data?.message || 'No message'}`
//       );
      
//       // Authentication error
//       if (response.status === 401) {
//         console.error('Auth error details:', response.data);
        
//         // If it's a login attempt
//         if (response.config.url.includes('/login')) {
//           // Don't show toast here, let the login component handle it
//           console.log('Login failed, letting component handle the error');
//         } else if (response.config.url.includes('/register-admin')) {
//           // Don't show toast for admin registration attempts
//           console.log('Admin setup failed, might be already set up');
//         } else {
//           // Session expired, clear token and redirect
//           console.log('Session expired, clearing token');
//           localStorage.removeItem('token');
          
//           toast({
//             title: "Session Expired",
//             description: "Please log in again",
//             variant: "destructive"
//           });
//         }
//       } 
//       // Authorization error
//       else if (response.status === 403) {
//         toast({
//           title: "Access Denied",
//           description: response.data?.message || "You don't have permission for this action",
//           variant: "destructive"
//         });
//       }
//       // Bad request
//       else if (response.status === 400) {
//         const message = response.data?.message || "Invalid request";
//         toast({
//           title: "Error",
//           description: message,
//           variant: "destructive"
//         });
//       }
//       // Server error
//       else if (response.status === 500) {
//         toast({
//           title: "Server Error",
//           description: response.data?.message || "Something went wrong on the server",
//           variant: "destructive"
//         });
//         console.error('Server error details:', response.data);
//       }
//       // Any other error
//       else {
//         console.error(`Unhandled error status: ${response.status}`, response.data);
//       }
//     } else {
//       // Network error handling
//       console.error('Network error:', error.message);
      
//       // Check if it's a timeout error
//       if (error.code === 'ECONNABORTED') {
//         toast({
//           title: "Request Timeout",
//           description: "The server is taking too long to respond. Please try again later.",
//           variant: "destructive"
//         });
//       } 
//       // Check if it's a connection refused error
//       else if (error.message.includes('Network Error')) {
//         toast({
//           title: "Network Error",
//           description: "Cannot connect to the server. Please check your internet connection and try again.",
//           variant: "destructive"
//         });
//       }
//       // Any other network error
//       else {
//         toast({
//           title: "Connection Failed",
//           description: "Failed to connect to the server. Please try again later.",
//           variant: "destructive"
//         });
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

export default api;

// import axios from 'axios';
// import { toast } from '@/components/ui/use-toast';
// import { Message } from '../types/chat';

// // Define the base URL with proper fallback
// const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000,
// });

// // Request interceptor for auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;
    
//     if (response) {
//       const message = response.data?.message || 'An error occurred';
//       switch (response.status) {
//         case 401:
//           localStorage.removeItem('token');
//           toast({ title: "Session Expired", description: "Please log in again", variant: "destructive" });
//           break;
//         case 403:
//           toast({ title: "Access Denied", description: message, variant: "destructive" });
//           break;
//         case 400:
//           toast({ title: "Error", description: message, variant: "destructive" });
//           break;
//         case 500:
//           toast({ title: "Server Error", description: message, variant: "destructive" });
//           break;
//       }
//     } else {
//       toast({
//         title: "Connection Failed",
//         description: "Failed to connect to the server. Please try again later.",
//         variant: "destructive"
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// export const chatApi = {
//   getMessages: async (senderId: string, receiverId: string): Promise<Message[]> => {
//     try {
//       const response = await api.get(`/chat/messages/${senderId}/${receiverId}`);
//       return response.data.messages || [];
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       throw error;
//     }
//   },

//   sendMessage: async (
//     senderId: string,
//     receiverId: string,
//     message: string
//   ): Promise<Message> => {
//     try {
//       const response = await api.post('/chat/send', {
//         senderId,
//         receiverId,
//         message,
//       });
//       return response.data.chat;
//     } catch (error) {
//       console.error('Error sending message:', error);
//       throw error;
//     }
//   },
// };

// export default chatApi;  // Changed from exporting 'api' to 'chatApi'