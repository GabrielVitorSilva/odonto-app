import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  token: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredToken();
  }, []);

  async function loadStoredToken() {
    try {
      const storedToken = await AsyncStorage.getItem('@OdontoApp:token');
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Erro ao carregar token:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(newToken: string) {
    try {
      await AsyncStorage.setItem('@OdontoApp:token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem('@OdontoApp:token');
      setToken(null);
    } catch (error) {
      console.error('Erro ao remover token:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 