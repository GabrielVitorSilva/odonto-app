import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Profile, ProfileResponse } from '@/services/auth';
import type { ClientUser } from '@/services/types/treatments';

interface AuthContextData {
  token: string | null;
  signIn: (token: string) => Promise<void>;
  profile: ProfileResponse | null;
  setProfile: React.Dispatch<React.SetStateAction<ProfileResponse | null>>
  clientSelected: ClientUser | null;
  setClientSelected: React.Dispatch<React.SetStateAction<ClientUser | null>>
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [clientSelected, setClientSelected] = useState<ClientUser | null>(null);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const [storedToken, storedProfile] = await Promise.all([
        AsyncStorage.getItem('@OdontoApp:token'),
        AsyncStorage.getItem('@OdontoApp:profile')
      ]);

      if (storedToken) {
        setToken(storedToken);
      }
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
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
      await Promise.all([
        AsyncStorage.removeItem('@OdontoApp:token'),
        AsyncStorage.removeItem('@OdontoApp:profile')
      ]);
      setToken(null);
      setProfile(null);
    } catch (error) {
      console.error('Erro ao remover dados:', error);
      throw error;
    }
  }

  const handleSetProfile: React.Dispatch<React.SetStateAction<ProfileResponse | null>> = async (newProfile) => {
    try {
      const profileToSave = typeof newProfile === 'function' ? newProfile(profile) : newProfile;
      if (profileToSave) {
        await AsyncStorage.setItem('@OdontoApp:profile', JSON.stringify(profileToSave));
      } else {
        await AsyncStorage.removeItem('@OdontoApp:profile');
      }
      setProfile(profileToSave);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, isLoading, profile, setProfile: handleSetProfile, clientSelected, setClientSelected }}>
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