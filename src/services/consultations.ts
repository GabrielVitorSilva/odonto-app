import api from './api/api';

interface IScheduleConsultRequest {
  clientId: string,
  professionalId: string,
  treatmentId: string,
  dateTime: string,
}

export enum ConsultationStatus {
  SCHEDULED = 'SCHEDULED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export interface Consultation {
  status: ConsultationStatus;
  professionalId: string;
  id: string;
  clientId: string;
  treatmentId: string;
  dateTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsultationsResponse {
  consultations: Consultation[];
}

export const consultationService = {
  async scheduleConsult(data: IScheduleConsultRequest): Promise<void> {
    try {
      const response = await api.post<void>('/consultations', {
        clientId: data.clientId,
        professionalId: data.professionalId,
        treatmentId: data.treatmentId,
        dateTime: data.dateTime,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error scheduling consultation:', error?.response?.data);
      throw error; 
    }
  },

  async listConsultationsByProfessional(professionalId: string): Promise<ConsultationsResponse>{
    try {
      const response = await api.get<ConsultationsResponse>(`/professionals/${professionalId}/consultations`);
      return response.data;
    } catch (error: any) {
      console.error('Error List consultations of the professional', error?.response?.data);
      throw error;
    }
  },

  async listConsultationsByClient(clientId: string): Promise<ConsultationsResponse>{
    try {
      const response = await api.get<ConsultationsResponse>(`/clients/${clientId}/consultations`);
      return response.data;
    } catch (error: any) {
      console.error('Error List consultations of the client', error?.response?.data);
      throw error;
    }
  }
}; 