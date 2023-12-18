import { z } from "zod";

export const createPostSchema = z.object({
  subjectPost: z
    .string()
    .min(3, "titulo muito curto")
    .max(50, "titulo muito longo"),
  disciplinePost: z
    .string()
    .min(3, "disciplina muito curta")
    .max(30, "disciplina muito longo"),
  textPost: z.string(),
});

export type CreatePostSchemaSchema = z.infer<typeof createPostSchema>;
