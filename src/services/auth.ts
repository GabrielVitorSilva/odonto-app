import api from './api/api';
import { LoginFormData } from '@/schemas/loginSchema';
import { RegisterFormData } from '@/schemas/registerSchema';

interface AuthResponse {
  token: string;
}

interface ProfileResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: Profile;
  };
}

export enum Profile {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  PROFESSIONAL = 'PROFESSIONAL',
}

export const authService = {
  async profile(token: string): Promise<ProfileResponse>{
    try {
      const response = await api.post<ProfileResponse>('/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error:any) {
      console.error('Error fetching profile:', error?.response?.data);
      throw error;
    }
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/sessions', {
      email: data.email.trim(),
      password: data.password,
    });
    return response.data;
  },

  async register(data: RegisterFormData) {
    const response = await api.post('/register/client', {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      cpf: data.cpf,
      phone: data.phone,
    });
    return response.data;
  },

  async registerAnotherUser(data: RegisterFormData) {
    const response = await api.post('/register', {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      cpf: data.cpf,
      phone: data.phone,
      role: data.role
    });
    return response.data;
  }
}; 