export interface MovieResponse {
    data: Movie
    showTimes: ShowTime[];
}


// export interface ListMovieResponse {
//     data: Movie;
// }
interface Movie {
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
};

interface ShowTime {
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

interface Room {
    _id: string;
    name: string;
    capacity: number;
    seatsPerRow: number;
}
