export enum ConsultationStatus {
  SCHEDULED = 'SCHEDULED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export interface UpdateConsultationRequest {
  clientId: string;
  professionalId: string;
  treatmentId: string;
  dateTime: Date;
  status?: 'SCHEDULED' | 'CANCELED' | 'COMPLETED'
}