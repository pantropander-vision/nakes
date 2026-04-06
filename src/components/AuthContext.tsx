'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  profession_type?: string;
  specialization?: string;
  province?: string;
  kota?: string;
  current_workplace?: string;
  bio?: string;
  account_type?: string;
  employer_facility_name?: string;
  employer_facility_type?: string;
  employer_description?: string;
  employer_website?: string;
  employer_size?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Record<string, string>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nakes_token');
    if (token) {
      api.me()
        .then(data => setUser(data.user))
        .catch(() => localStorage.removeItem('nakes_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    localStorage.setItem('nakes_token', data.token);
    setUser(data.user);
  };

  const register = async (formData: Record<string, string>) => {
    const data = await api.register(formData);
    localStorage.setItem('nakes_token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('nakes_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
