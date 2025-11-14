import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null; // <-- O TOKEN
  isLoading: boolean; // <-- Para "Lembrar" o utilizador
  login: (userData: User, token: string) => Promise<void>; // <-- Mudou
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 1. Carrega o token do AsyncStorage quando o App abre
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedToken = await AsyncStorage.getItem('@AvaliaStudents:token');
        const storedUser = await AsyncStorage.getItem('@AvaliaStudents:user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.warn('Falha ao carregar dados de autenticação', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadStorageData();
  }, []);

  // 2. Função de LOGIN (Agora recebe o token)
  async function login(userData: User, tokenData: string) {
    setUser(userData);
    setToken(tokenData);

    try {
      // 3. Salva o User e o Token no AsyncStorage
      await AsyncStorage.setItem('@AvaliaStudents:token', tokenData);
      await AsyncStorage.setItem('@AvaliaStudents:user', JSON.stringify(userData));
      
      router.replace('/(tabs)/home');
    } catch (e) {
      console.error('Falha ao salvar no AsyncStorage', e);
    }
  }

  // 4. Função de LOGOUT (Agora limpa o AsyncStorage)
  async function logout() {
    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.removeItem('@AvaliaStudents:token');
      await AsyncStorage.removeItem('@AvaliaStudents:user');
    } catch (e) {
      console.error('Falha ao limpar AsyncStorage', e);
    }
    router.replace('/(auth)');
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. O Hook useAuth (sempre necessário)
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
