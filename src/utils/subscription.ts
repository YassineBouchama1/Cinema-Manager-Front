import customFetch from "./customFetch";

export const checkSubscriptionStatus = async () => {
    try {
        const data = await customFetch(

            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subscribe/status`,

            {
                method: 'GET',
            });
        return data;
    } catch (error) {
        console.error('Error checking subscription status:', error);
        throw error;
    }
};