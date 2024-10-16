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

  rating: number;
  year: number;
  genre: string;
  description: string;

  hasStream: boolean
  userRating?: null | number
}