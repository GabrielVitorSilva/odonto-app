import api from './api/api';

interface IScheduleConsultRequest {
  clientId: string,
  professionalId: string,
  treatmentId: string,
  dateTime: string,
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
}; 