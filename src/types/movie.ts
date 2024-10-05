export interface Movie {
    length: number;
    map(arg0: (movie: Movie) => import("react").JSX.Element): import("react").ReactNode;
    _id: string;
    name: string;
    duration: string; 
    cinemaId: string;
    category: string;
    image: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }