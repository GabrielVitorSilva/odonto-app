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

export const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString("pt-BR"),
      time: date.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })
    };
  };

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

  async listConsultationsByProfessional(professionalId: string): Promise<ListAllConsultationsResponse>{
    try {
      const response = await api.get<ListAllConsultationsResponse>(`/professionals/${professionalId}/consultations`);
      return response.data;
    } catch (error: any) {
      console.error('Error List consultations of the professional', error?.response?.data);
      throw error;
    }
  },

  async listConsultationsByClient(clientId: string): Promise<ListAllConsultationsResponse>{
    try {
      const response = await api.get<ListAllConsultationsResponse>(`/clients/${clientId}/consultations`);
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

  async completeConsultation(consultationId: string, newData: { patientName: string, professionalName: string, treatmentName: string, dateTime: Date }): Promise<void> {
    try {
      const {patientName, professionalName, treatmentName, dateTime} = newData;

      const [clientId, professionalId, treatmentId] = await Promise.all([
        this.findClient(patientName),
        this.findProfessional(professionalName),
        this.findTreatment(treatmentName)
      ]);

      if (clientId && professionalId && treatmentId){
        const updatedConsultationData = {clientId, professionalId, treatmentId, dateTime}
        this.updateConsultation(consultationId, {...updatedConsultationData, status: "COMPLETED"});
      }
    } catch (error: any){
      console.error('Error update consultations', error?.response?.data);
      throw error;
    }
  },
  async findClient(name: string) {
    const clients = await treatmentsService.listClients();
    const client = clients.find(client => client.name == name)
    return client?.clientId;
  },
  async findProfessional(name: string) {
    const professionals = await treatmentsService.listProfessionals();
    const professional = professionals.find(professional => professional.name == name)
    return professional?.professionalId;
  },
  async findTreatment(name: string) {
    const { treatments } = await treatmentsService.listAllTreatments();
    const treatment = treatments.find(treatment => treatment.name == name)
    return treatment?.id;
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