import type { Profile } from "../auth";

export interface createTreatmentRequest {
  name: string,
  description: string,
  duration: number,
  price: number,
  professionalIds: string[] | null,
}

export interface createTreatmentResponse {
  treatment: {
    id: string,
    name: string,
    description: string,
    durationMinutes: number,
    price: number,
    professionalIds: string[] | null,
  }
}

export interface IUser{
  user: {
    id: string,
    name: string,
    email: string,
    cpf: string,
    phone: string,
    role: Profile,
  }
}

export interface ProfessionalUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string | null;
  role: Profile;
  professionalId: string;
  createdAt: string;
  updatedAt: string;
  password: string;
}

export interface ProfessionalsResponse {
  professionals: ProfessionalUser[];
  total: number;
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string | null;
  role: Profile;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  password: string;
}

export interface ClientsResponse {
  clients: ClientUser[];
  total: number;
}

export interface IGetUser {
  user: {
    User: {
      id: string,
      name: string,
      email: string,
      cpf: string,
      phone: string,
      role: string,
      createdAt: string,
      updatedAt: string,
      Professional: {
        id: string
      }
    },
  }
  profileData: {
    id: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
  }
}

export interface editTreatmentRequest {
  name: string,
  description: string,
  duration: number,
  price: number,
}

export interface editTreatmentResponse {
  treatment: {
    id: string,
    name: string,
    description: string,
    durationMinutes: number,
    price: number,
    professionalIds: string[] | null,
  }
}