import { getSession } from "@/lib/getSessions";
import { BackendError } from "@/types/errors";
import { delay } from "@/utils/delay";

export interface ReservationData {
    showTimeId: string;
    seats: number[];
}

interface ReservationResponse {
    message: string;
    data?: any;
}

export async function makeReservation(
    reservationData: ReservationData
): Promise<ReservationResponse> {
    try {


        // chck if user login and f token provided
        const session = await getSession();

        if (!session?.token) {
            throw new Error('Unauthorized , token required');
        }


        await delay(2000);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.token}`,
            },
            body: JSON.stringify(reservationData),
        });

        const data = await response.json();

        if (!response.ok) {
            const error: BackendError = data;
            if (error.errors) {



                // Validation errors
                const errorMessages = error.errors.map(err => `${err.path}: ${err.msg}`).join(', ');
                throw new Error(errorMessages);
            } else if (error.message) {


                // General error message
                throw new Error(error.message);
            } else {
                throw new Error('An unexpected error occurred');
            }
        }

        return data as ReservationResponse;
    } catch (error) {
        console.error('Reservation error:', error);
        throw error;
    }
}