import api from './api';
import { LoginFormData } from '@/schemas/loginSchema';
import { RegisterFormData } from '@/schemas/registerSchema';

export const authService = {
  async login(data: LoginFormData) {
    const response = await api.post('/sessions', {
      email: data.email.trim(),
      password: data.password,
    });
    return response.data;
  },

  async register(data: RegisterFormData) {
    const response = await api.post('/register/client', {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      cpf: data.cpf,
    });
    return response.data;
  }
}; 