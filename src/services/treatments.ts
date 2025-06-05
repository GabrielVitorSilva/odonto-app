import api from './api/api';
import type { IUser } from './types/treatments';

export interface Professional {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  professionals: Professional[];
}

export interface TreatmentsResponse {
  treatments: Treatment[];
} 

export const treatmentsService = {
  async listAllTreatments(): Promise<TreatmentsResponse>{
    try {
      const response = await api.get<TreatmentsResponse>('/treatments');
      
      if (!response.data || !response.data.treatments) {
        throw new Error('Dados de tratamentos inválidos ou vazios');
      }
      
      return response.data;
    } catch (error:any) {
      console.error('Erro ao buscar tratamentos:', error?.response?.data || error.message);
      throw error;
    }
  },
  async listProfessionalAvailablesToTreatment(userIds: string[]): Promise<IUser[]>{
    try {
      if (!userIds || !Array.isArray(userIds)) {
        return [];
      }

      const data = await Promise.all(userIds.map(async (id) => {
        const response = await api.get<IUser>(`/users/${id}`);
        return response.data;
      }));
      
      return data;
    } catch (error:any) {
      console.error('Erro ao buscar usuários:', error?.response?.data || error.message);
      throw error;
    }
  },
}; 