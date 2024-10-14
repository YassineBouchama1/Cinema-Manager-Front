export interface Movie {
  length: number;
  _id: string;
  name: string;
  duration: string;
  category: string;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rating: number;
  year?: number;
  genres: string;
  description?: string;
  trailerUrl?: string;
  hasStream?: boolean
  userRating?: null | number
}