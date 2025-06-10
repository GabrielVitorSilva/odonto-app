import { z } from 'zod';
import { Profile } from '@/services/auth';

export const registerAnotherUserSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .transform(val => val.trim()),
  
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .transform(val => val.trim().toLowerCase()),
  
  cpf: z.string()
    .min(1, 'CPF é obrigatório')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00'),
  
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula.',
    }),

  phone: z.string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone deve estar no formato (00) 00000-0000'),

  role: z.nativeEnum(Profile, {
    errorMap: () => ({ message: 'Perfil inválido' })
  })
});

export type RegisterAnotherUserFormData = z.infer<typeof registerAnotherUserSchema>; 