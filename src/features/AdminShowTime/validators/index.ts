import { z } from 'zod';

export const showTimesSchema = z.object({
  price: z.number().min(1, 'Price is required'),
  movieId: z.string().min(1, 'Movie ID is required'),
  roomId: z.string().min(1, 'Room ID is required'),
  startAt: z.string().min(1, 'startAt is required'),
});

export type showTimesSchemaData = z.infer<typeof showTimesSchema>;




export const validateShowTimeData = (data: showTimesSchemaData) => {
  try {
    showTimesSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {

      throw new Error(error.errors.map(e => e.message).join(', '));
    }
    throw error;
  }
};