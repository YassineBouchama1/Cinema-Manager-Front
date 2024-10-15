import { z } from 'zod';

export const CreateMovieSchema = z.object({
  name: z.string().min(1, 'name is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.number().min(1, 'Running time must be at least 1 minute'),
  genre: z.string().min(1, 'Genre is required'),
});

export type CreateMovieFormInputs = z.infer<typeof CreateMovieSchema>;






export const UpdateMovieSchema = z.object({
  name: z.string().min(1, 'name is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  duration: z.number().min(1, 'Running time must be at least 1 minute').optional(),
  genre: z.string().min(1, 'Genre is required').optional(),
});

export type UpdateMovieFormInputs = z.infer<typeof UpdateMovieSchema>;


