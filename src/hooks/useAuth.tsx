
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and get user data
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      // This would be an API call to validate the token
      // For now, we'll simulate with mock data
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        name: 'Demo User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(mockUser);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // This would be an API call
      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email,
          name: 'Demo User',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'mock-jwt-token',
      };

      localStorage.setItem('token', mockResponse.token);
      setUser(mockResponse.user);
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // This would be an API call
      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email,
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'mock-jwt-token',
      };

      localStorage.setItem('token', mockResponse.token);
      setUser(mockResponse.user);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
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
