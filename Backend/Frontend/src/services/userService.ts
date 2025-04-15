import api from './api';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

// Register a new user
export const registerUser = async (userData: RegisterFormData) => {
  try {
    console.log('Registering user:', userData.email);
    
    const response = await api.post('/users/register', userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials: LoginFormData) => {
  try {
    console.log('Login attempt for:', credentials.email);
    
    // Special handling for admin credentials
    if (credentials.email === 'admin@example.com') {
      console.log('Processing admin login');
      
      // First try to set up admin if it doesn't exist
      try {
        await api.post('/users/register-admin', {}, {
          headers: { 'x-setup-mode': 'true' }
        });
        console.log('Admin registration completed');
      } catch (setupError: any) {
        console.log('Admin setup response:', setupError.response?.data || 'No response');
        // It's okay if this fails - it might mean the admin already exists
      }
    }
    
    const response = await api.post('/users/login', credentials);
    console.log('Login response:', response.data);
    
    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('Token saved to localStorage');
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Login error details:', error.response?.data || error.message);
    
    if (credentials.email === 'admin@example.com') {
      // Show more detailed error for admin login
      const errorMessage = error.response?.data?.message || 'Unknown error';
      console.error(`Admin login failed: ${errorMessage}`);
    }
    
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    // Call the backend to invalidate the token if needed
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Logging out user with token');
      try {
        await api.post('/users/logout');
      } catch (logoutError) {
        console.error('Error during logout API call:', logoutError);
        // Continue with local logout even if API call fails
      }
    }
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    // Always clean up local storage regardless of API response
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
  }
};

// Check if user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  console.log('Checking if user is logged in:', !!token);
  return token !== null;
};

// Get current user
export const getCurrentUser = async () => {
  try {
    console.log('Fetching current user data');
    
    const response = await api.get('/users/me');
    console.log('Current user data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userData: Partial<RegisterFormData>) => {
  try {
    console.log('Updating user profile');
    
    const response = await api.put('/users/me', userData);
    console.log('Profile update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (passwordData: PasswordChangeData) => {
  try {
    console.log('Changing password');
    
    const response = await api.put('/users/password', passwordData);
    console.log('Password change response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Get user activity logs
export const getUserPersonalLogs = async () => {
  try {
    console.log('Fetching user logs');
    
    const response = await api.get('/users/me/logs');
    console.log('User logs response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user logs:', error);
    throw error;
  }
};