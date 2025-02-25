import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

// Define types for the user and auth context
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
  error: string | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('auth_user', null);
  const [token, setToken] = useLocalStorage<string | null>('auth_token', null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  const isAuthenticated = !!user && !!token;

  // Simulate checking token validity on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      
      try {
        setIsLoading(true);
        // In a real app, you would call an API to verify the token
        // For demo, we'll just use a timeout to simulate the API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // If token is invalid, log the user out
        // For demo, we'll consider all tokens valid
      } catch (error) {
        console.error('Token verification failed:', error);
        // If verification fails, clear auth data
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - simulate successful login with demo credentials
      if (email === 'demo@example.com' && password === 'password') {
        // Simulate server response
        const mockResponse = {
          user: {
            id: 'user-123',
            email: 'demo@example.com',
            name: 'Demo User',
            role: 'admin' as const,
            avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff',
          },
          token: 'mock-jwt-token-123456789',
        };
        
        setUser(mockResponse.user);
        setToken(mockResponse.token);
      } else {
        throw new Error('Invalid email or password. Try using demo@example.com and password.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - simulate successful signup
      // In a real app, you would call an API endpoint for registration
      const mockResponse = {
        user: {
          id: 'user-' + Math.random().toString(36).substring(2, 9),
          email,
          name,
          role: 'user' as const,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
        },
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15),
      };
      
      setUser(mockResponse.user);
      setToken(mockResponse.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear authentication data
    setUser(null);
    setToken(null);
    setError(null);
  };

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;