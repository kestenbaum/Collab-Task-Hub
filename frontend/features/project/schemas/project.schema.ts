import { z } from 'zod';

export const createFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
});

export type CreateFormData = z.infer<typeof createFormSchema>;
