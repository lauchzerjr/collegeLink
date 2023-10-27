import { z } from 'zod';

const emailContainsAcademicDomain = /ftec|fsg|ucs/i;

export const signupSchema = z.object({
  name: z
    .string()
    .min(5, 'nome muito curto')
    .max(50, 'nome muito longo')
    .transform(value => {
      return value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }),
  email: z.string().email('email inválido').refine((email) => {
    return emailContainsAcademicDomain.test(email);
  }, {
    message: 'O email não é acadêmico. Use um email com domínio ftec, fsg ou ucs.',
  }),

  password: z.string().min(8, 'senha deve ter no mínimo 8 caracteres'),
});

export type SignupSchema = z.infer<typeof signupSchema>;
