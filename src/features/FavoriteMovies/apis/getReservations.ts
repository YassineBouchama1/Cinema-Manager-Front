import customFetch from "@/utils/customFetch";
import { ReservationData } from "../types";

export const getReservations = async (): Promise<ReservationData> => {
    try {
        return await customFetch<void, ReservationData>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get reservations error:', error);
        throw error;
    }
};