import api from './api/api';

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
      console.log('Resposta da API:', response.data);
      
      if (!response.data || !response.data.treatments) {
        throw new Error('Dados de tratamentos inválidos ou vazios');
      }
      
      return response.data;
    } catch (error:any) {
      console.error('Erro ao buscar tratamentos:', error?.response?.data || error.message);
      throw error;
    }
  },

}; 