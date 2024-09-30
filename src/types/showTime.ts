
export interface ShowTime {
    id: string;
    title: string;
    image: string;
    genres: string[];
    description: string;
    rating: string;
    language: string;
    dimension: '3D' | '2D';
    duration: string;
    showTimes: {
        date: string;
        times: string[];
    }[];
}


export interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    language: string;
    ageRating: string;
    subtitles?: string;
    dimension: '2D' | '3D';
    duration: string;
  }