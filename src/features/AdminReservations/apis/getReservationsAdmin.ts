import { IReservationsAdminResponse } from "@/types/reservation";
import customFetch from "@/utils/customFetch";





export const getReservationsAdmin = async (params?: Record<string, string | string[] | undefined>): Promise<IReservationsAdminResponse> => {
    try {
        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        return await customFetch<void, IReservationsAdminResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation/admin?${queryString}`,
            { method: 'GET' }
        );
    } catch (error) {
        console.error('Get Reservations error:', error);
        throw error;
    }
};