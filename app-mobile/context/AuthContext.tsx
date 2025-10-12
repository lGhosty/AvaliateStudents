import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'expo-router';

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  function login(userData: User) {
    setUser(userData);
    router.replace('/(tabs)/home');
  }

  function logout() {
    setUser(null);
    router.replace('/(auth)');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
