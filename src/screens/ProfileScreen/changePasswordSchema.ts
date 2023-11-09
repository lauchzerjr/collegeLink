import {z} from 'zod';

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8, 'senha deve ter no mínimo 8 caracteres'),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;