import api from './api/api';
import type { IUser, ProfessionalsResponse, ProfessionalUser } from './types/treatments';
import { Profile } from './auth';

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
  async listAllTreatments(): Promise<TreatmentsResponse> {
    try {
      const response = await api.get<TreatmentsResponse>('/treatments');

      if (!response.data || !response.data.treatments) {
        throw new Error('Dados de tratamentos inválidos ou vazios');
      }

      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar tratamentos:', error?.response?.data || error.message);
      throw error;
    }
  },
  async listProfessionalAvailablesToTreatment(userIds: string[]): Promise<IUser[]> {
    try {
      if (!userIds || !Array.isArray(userIds)) {
        return [];
      }

      const data = await Promise.all(userIds.map(async (id) => {
        const response = await api.get<IUser>(`/users/${id}`);
        return response.data;
      }));

      return data;
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error?.response?.data || error.message);
      throw error;
    }
  },
  async listProfessionals(): Promise<ProfessionalUser[]> {
    try {
      const response = await api.get<ProfessionalsResponse>(`/professionals`);
      console.log(response.data.professionals);
      

      return response.data.professionals;
    } catch (error: any) {
      console.error('Erro ao buscar profissionais:', error?.response?.data || error.message);
      throw error;
    }
  },
  async addProfessionalFromTreatment(treatmentId: string, userIds: string[]): Promise<void> {
    try {
      const promises = userIds.map(userId => 
        api.post<void>(`/treatments/${treatmentId}/professionals/${userId}`)
      );
      
      await Promise.all(promises);
      return;
    } catch (error: any) {
      console.error('Erro ao vincular profissionais:', error?.response?.data || error.message);
      throw error;
    }
  },
  async removeProfessionalFromTreatment(userId: string, treatmentId: string): Promise<void> {
    try {
      const response = await api.delete<void>(`/treatments/${treatmentId}/professionals/${userId}`);
      console.log('treatments', response.data);

      return;
    } catch (error: any) {
      console.error('Erro ao buscar tratamentos:', error?.response?.data || error.message);
      throw error;
    }
  },
}; 