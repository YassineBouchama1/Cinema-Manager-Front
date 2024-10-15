import { Movie } from './movie';
import { Room } from './room';

export interface ShowTime {
  _id: string;
  price: number;
  movieId: string;
  roomId: Room;
  startAt: string;
  endAt: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  reservedSeats: number[];
}





export interface MovieHasShowTimes {
  length: number;
  _id: string;
  name: string;
  duration: string;

  category: string;
  image: string;
  video?: string;
  rate: number,
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

}


export interface ShowTimeAdmin {
  _id: string;
  price: number;
  movieId: string | {
    _id: string
    name: string;
    image: string;
    duration: string;
  };
  roomId: string | {
    _id: string
    name: string;
    capacity: string;
  };
  startAt: Date;
  endAt: Date;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;

}