export interface Movie {
  length: number;
  map(arg0: (movie: Movie) => import("react").JSX.Element): import("react").ReactNode;
  _id: string;
  name: string;
  duration: string;
  category: string;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;

  rate: number;
  year?: number;

  genres: string;
  description?: string;
  trailerUrl?: string;
}