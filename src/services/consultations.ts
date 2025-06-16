import api from './api/api';
import { treatmentsService } from './treatments';
import type { ConsultationStatus, UpdateConsultationRequest } from './types/consultations';

interface IScheduleConsultRequest {
  clientId: string,
  professionalId: string,
  treatmentId: string,
  dateTime: string,
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

export interface ListAllConsultation {
  status: ConsultationStatus;
  treatmentName: string;
  id: string;
  clientName: string;
  professionalName: string;
  dateTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListAllConsultationsResponse {
  consultations: ListAllConsultation[];
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
  async listAllConsultations(admId: string): Promise<ListAllConsultationsResponse> {
    try {
      const response = await api.get<ListAllConsultationsResponse>(`/users/${admId}/consultations`);
      return response.data;
    } catch (error: any) {
      console.error('Error listing consultations:', error?.response?.data);
      throw error;
    }
  },
  async listAllClientConsultations(clientId: string): Promise<ListAllConsultationsResponse> {
    try {
      const response = await api.get<ListAllConsultationsResponse>(`/clients/${clientId}/consultations`);
      return response.data;
    } catch (error: any) {
      console.error('Error listing consultations:', error?.response?.data);
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
  },

  async updateConsultation(consultationId: string, newData: UpdateConsultationRequest): Promise<void> {
    try {
      const response = await api.patch(`/consultations/${consultationId}`, newData)
    } catch (error: any) {
      console.error('Error Update consultations', error?.response?.data);
      throw error;
    }
  },

  async deleteConsultation(consultationId: string): Promise<void> {
    try {
      const response = await api.delete(`/consultations/${consultationId}`)
    } catch (error: any) {
      console.error('Error Update consultations', error?.response?.data);
      throw error;
    }
  }
}; 