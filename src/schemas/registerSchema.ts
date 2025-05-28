import { z } from 'zod';

export const registerSchema = z.object({
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
  
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  
  terms: z.boolean()
    .refine(val => val === true, 'Você precisa aceitar os termos e condições')
});

export type RegisterFormData = z.infer<typeof registerSchema>; 