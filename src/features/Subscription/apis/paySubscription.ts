import customFetch from "@/utils/customFetch";


interface ReservationResponse {
    message: string;
    data?: any;
}

export async function paySubscription(): Promise<ReservationResponse> {
    try {
        return await customFetch<unknown, ReservationResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/subscribe`,
            {
                method: 'PUT',

            }
        );
    } catch (error) {
        console.error('subscribe error:', error);
        throw error;
    }
}