import { BackendError } from "@/types/errors";
import { delay } from "@/utils/delay";
import { ReservationData } from "../types";
import { getSession } from "@/lib/getSessions";

export const getReservations = async (): Promise<ReservationData> => {
    try {
        const session = await getSession();

        if (!session?.token) {
            throw new Error('Unauthorized, token required');
        }

        await delay(2000);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.token}`,

            },
        });

        const data = await response.json();

        if (!response.ok) {
            const error: BackendError = data;
            if (error.errors) {
                const errorMessages = error.errors.map(err => `${err.path}: ${err.msg}`).join(', ');
                throw new Error(errorMessages);
            } else if (error.message) {
                throw new Error(error.message);
            } else {
                throw new Error('An unexpected error occurred');
            }
        }

        return data as ReservationData;
    } catch (error) {
        console.error('Get reservations error:', error);
        throw error;
    }
};