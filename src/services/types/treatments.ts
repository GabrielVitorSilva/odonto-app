import type { Profile } from "../auth";

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