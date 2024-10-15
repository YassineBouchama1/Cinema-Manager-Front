import { z } from 'zod';

export const RoomSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  capacity: z.number().min(1, 'Capacity must be greater than 0'),
  seatsPerRow: z.number().min(1, 'Seats per row must be greater than 0'),
  type: z.string().min(1, 'Type is required'),
});
export type RoomFormInputs = z.infer<typeof RoomSchema>;





