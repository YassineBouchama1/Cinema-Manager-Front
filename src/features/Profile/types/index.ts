export interface Reservation {
    reservationId: string;
    showTime: {
        startAt: string;
        endAt: string;
        price: number;
        movie: {
            name: string;
            duration: string;
            category: string;
            image: string;
        };
        room: {
            name: string;
        };
    };
    seats: number[];
    totalPrice: number;
    status: string;
}