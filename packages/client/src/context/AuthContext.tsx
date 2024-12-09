import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Define the shape of the authentication context
interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === 'undefined') return; // Skip SSR

      const authToken = localStorage.getItem('auth_token');
      if (authToken) {
        setIsAuthenticated(true);
        if (router.pathname !== '/dashboard') router.replace('/dashboard');
      } else {
        setIsAuthenticated(false);
        if (router.pathname !== '/login') router.replace('/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
