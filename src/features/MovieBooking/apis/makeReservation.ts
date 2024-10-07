import customFetch from "@/utils/customFetch";

export interface ReservationData {
    showTimeId: string;
    seats: number[];
}

interface ReservationResponse {
    message: string;
    data?: any;
}

export async function makeReservation(reservationData: ReservationData): Promise<ReservationResponse> {
    try {
        return await customFetch<ReservationData, ReservationResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation`,
            {
                method: 'POST',
                data: reservationData,
            }
        );
    } catch (error) {
        console.error('Reservation error:', error);
        throw error;
    }
}