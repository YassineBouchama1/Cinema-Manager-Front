import { z } from 'zod';

// schema
export const showTimesSchema = z.object({
  price: z.number().min(1, 'Price is required'),
  movieId: z.string().min(1, 'Movie ID is required'),
  roomId: z.string().min(1, 'Room ID is required'),
  startAt: z.string().min(1, 'Start time is required'),
});

export type showTimesSchemaData = z.infer<typeof showTimesSchema>;

// error type based 
export type ShowTimeErrors = {
  price?: string;
  movieId?: string;
  roomId?: string;
  startAt?: string;
};

export const validateShowTimeData = (data: showTimesSchemaData, setErrors: (errors: ShowTimeErrors) => void) => {
  const result = showTimesSchema.safeParse(data);
  if (!result.success) {
    const errorMessages: ShowTimeErrors = {};
    result.error.errors.forEach((error) => {
      errorMessages[error.path[0] as keyof ShowTimeErrors] = error.message;
    });
    setErrors(errorMessages);
    return false;
  }
  setErrors({});
  return true;
};