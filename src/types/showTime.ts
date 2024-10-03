import { Room } from './room';

export interface ShowTime {
  _id: string;
  price: number;
  movieId: string;
  cinemaId: string;
  roomId: Room; 
  startAt: string;
  endAt: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reservedSeats: number[]; 
}