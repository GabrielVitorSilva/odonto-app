import api from './api/api';
import type { createTreatmentRequest, createTreatmentResponse, IGetUser, IUser, ProfessionalsResponse, ProfessionalUser } from './types/treatments';
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

export interface TreatmentResponse {
  treatment: Treatment;
}

export const treatmentsService = {
  async createTreatment({description, name, professionalIds}:createTreatmentRequest): Promise<createTreatmentResponse> {
    try {
      const response = await api.post<createTreatmentResponse>('/treatments',{
        name,
        description,
        durationMinutes: 60,
        price: 1,
        professionalIds: professionalIds || [],
      });

      if (!response.data || !response.data.treatment) {
        throw new Error('Dados de tratamentos inválidos ou vazios');
      }

      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar tratamentos:', error?.response?.data || error.message);
      throw error;
    }
  },

  async getTreatment(id: string): Promise<Treatment> {
    try {
      const response = await api.get<TreatmentResponse>(`/treatments/${id}`);

      if (!response.data || !response.data.treatment) {
        throw new Error('Dados do tratamento inválidos ou vazios');
      }

      return response.data.treatment;
    } catch (error: any) {
      console.error('Erro ao buscar tratamento:', error?.response?.data || error.message);
      throw error;
    }
  },

  async listAllTreatments(): Promise<TreatmentsResponse> {
    try {
      const response = await api.get<TreatmentsResponse>('/treatments',);

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
      return response.data.professionals;
    } catch (error: any) {
      console.error('Erro ao buscar profissionais:', error?.response?.data || error.message);
      throw error;
    }
  },
  async getUser(id:string): Promise<IGetUser> {
    try {
      const response = await api.get<IGetUser>(`/users/${id}`);
      return response.data
    } catch (error: any) {
      console.error('Erro ao buscar profissionais:', error?.response?.data || error.message);
      throw error;
    }
  },
  async addProfessionalFromTreatment(treatmentId: string, userIds: string[]): Promise<void> {
    try {
      const promises = userIds.map(async (userId) => {
        const userData = await this.getUser(userId);
        const professionalId = userData.user.Professional.id;
        return api.post<void>(`/treatments/${treatmentId}/professionals/${professionalId}`);
      });
      
      await Promise.all(promises);
      return;
    } catch (error: any) {
      console.error('Erro ao vincular profissionais:', error?.response?.data || error.message);
      throw error;
    }
  },
  async removeProfessionalFromTreatment(userId: string, treatmentId: string): Promise<void> {
    try {
      await api.delete<void>(`/treatments/${treatmentId}/professionals/${userId}`);

      return;
    } catch (error: any) {
      console.error('Erro ao buscar tratamentos:', error?.response?.data || error.message);
      throw error;
    }
  },
}; 