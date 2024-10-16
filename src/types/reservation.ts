
interface IMovie {
    _id: string;
    name: string;
    image: string;
}


interface IRoom {
    _id: string;
    name: string;
    capacity: number;
}


interface IShowTime {
    _id: string;
    price: number;
    movieId: IMovie;
    roomId: IRoom;
    startAt: string;
    endAt: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

}


interface IUser {
    _id: string;
    name: string;
}


export interface IReservationAdmin {
    _id: string;
    userId: IUser;
    showTimeId: IShowTime;

    seats: number[];
    totalPrice: number;
    isDeleted: boolean;
    status: 'active' | 'cancel';
    createdAt: string;
    updatedAt: string;

}

// interface for the API response
export interface IReservationsAdminResponse {
    data: IReservationAdmin[];
    message: string
}