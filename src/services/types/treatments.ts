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