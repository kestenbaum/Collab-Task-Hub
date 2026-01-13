import { z } from 'zod';

export const createFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 6 characters'),
  description: z.string().min(6, 'Description must be at least 6 characters'),
});

export type CreateFormData = z.infer<typeof createFormSchema>;
