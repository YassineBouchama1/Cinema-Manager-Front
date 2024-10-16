import customFetch from "@/utils/customFetch";

export const removeReservationAdmin = async (reservationId: string): Promise<void> => {
    try {
        await customFetch<void>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation/${reservationId}`,
            { method: 'DELETE' }
        );
    } catch (error) {
        console.error('Error removing reservation:', error);
        throw error;
    }
};