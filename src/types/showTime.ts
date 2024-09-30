
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