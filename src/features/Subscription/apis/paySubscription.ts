import customFetch from "@/utils/customFetch";

interface ReservationResponse {
    id: string;
    message: string;
}

export interface PaySubscriptionParams {
    paymentMethodId?: string;
    planId: string;
}

export async function paySubscription(subscrbeData: PaySubscriptionParams): Promise<ReservationResponse> {
    try {
        return await customFetch<unknown, ReservationResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscribe/checkout`,
            {
                method: 'POST',
                data: subscrbeData,

            }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        throw error;
    }
}