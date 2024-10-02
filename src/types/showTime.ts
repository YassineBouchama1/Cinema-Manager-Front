


export interface ShowTime {
    _id: string;
    price: number;
    movieId: string;
    cinemaId: string;
    roomId: Room;
    startAt: string;
    endAt: string;
    isDeleted: boolean;
    reservedSeats: number[];
}


export interface Room {
    _id: string;
    name: string;
    capacity: number;
    seatsPerRow: number;
}