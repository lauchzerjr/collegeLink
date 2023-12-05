import { z } from "zod";

export const createPostSchema = z.object({
  subjectPost: z.string().max(50, "titulo muito longo"),
  discipline: z.string().max(30, "disciplina muito longo"),
  textPost: z.string(),
});

export type CreatePostSchemaSchema = z.infer<typeof createPostSchema>;
