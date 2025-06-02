import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getSavedUser, logoutUser, isRememberMeEnabled } from '../lib/auth';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user on component mount
    async function loadUser() {
      try {
        const remembered = await isRememberMeEnabled();
        if (remembered) {
          const savedUser = await getSavedUser();
          if (savedUser) {
            setUser(savedUser);
          }
        }
      } catch (error) {
        console.error('Error loading saved user:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated: !!user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}