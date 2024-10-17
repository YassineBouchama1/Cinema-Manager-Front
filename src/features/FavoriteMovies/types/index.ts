
export interface Movie {
    name: string;
    duration: string;
    category: string;
    image: string;
}

export interface Room {
    name: string;
}

export interface ShowTime {
    startAt: string;
    endAt: string;
    price: number;
    movie: Movie;
    room: Room;
}

export interface Reservation {
    reservationId: string;
    showTime: ShowTime;
    seats: number[];
    totalPrice: number;
    status: string;
}

export interface ReservationData {
    data: Reservation[];
}