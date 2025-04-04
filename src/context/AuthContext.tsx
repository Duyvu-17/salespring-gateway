import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define types for our authentication context
type User = {
  id: string;
  name: string;
  email: string;
  provider?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  loginWithGoogle: async () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, validate credentials against a database
      // For demo, check against "registered" users in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Update state
      setUser(userWithoutPassword);
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      
      navigate('/account');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, store user in a database
      // For demo, store in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password, // In a real app, this would be hashed
      };
      
      // Add to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Log user in
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Update state
      setUser(userWithoutPassword);
      
      toast({
        title: "Success",
        description: "Your account has been created",
      });
      
      navigate('/account');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    navigate('/');
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, check if user exists and send email
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((u: any) => u.email === email);
      
      if (!userExists) {
        // Don't reveal that user doesn't exist for security
        // Just pretend we sent the email
      }
      
      // For demo purposes, we'll simulate a token in localStorage
      // In a real app, this would be sent via email with a unique token
      const resetToken = `reset-${Date.now()}`;
      localStorage.setItem(`reset_${email}`, resetToken);
      
      toast({
        title: "Email sent",
        description: "Check your inbox for password reset instructions",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, validate token from database or JWT
      // For demo, we'll just simulate success
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Update the user's password (in a real app, with proper validation)
      // Here we're just simulating success
      localStorage.setItem('users', JSON.stringify(users));
      
      toast({
        title: "Success",
        description: "Your password has been reset successfully",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Google login function
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random id for the user
      const randomId = `google-user-${Date.now()}`;
      
      // Create a Google user
      const googleUser = {
        id: randomId,
        name: "Google User", // In a real implementation, this would come from Google
        email: `user-${randomId.substring(0, 5)}@gmail.com`, // Simulated email
        provider: "google",
        avatar: "https://lh3.googleusercontent.com/a/default-user=s120", // Default Google avatar
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(googleUser));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Update state
      setUser(googleUser);
      
      toast({
        title: "Success",
        description: "You have been logged in with Google successfully",
      });
      
      navigate('/account');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
