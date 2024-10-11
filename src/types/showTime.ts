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
  __v: number;
  reservedSeats: number[];
}





export interface MovieHasShowTimes {
  length: number;
  map(arg0: (movie: Movie) => import("react").JSX.Element): import("react").ReactNode;
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
  __v: number;
}