import { z } from 'zod';

export const profileSchema = z.object({
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
  city: z.string().max(30, 'cidade muito longa'),
  linkedin: z.string(),
  bio: z.string(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
