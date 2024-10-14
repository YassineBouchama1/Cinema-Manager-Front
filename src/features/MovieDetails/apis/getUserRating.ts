import customFetch from "@/utils/customFetch";

interface UserRatingData {
    message: string;
    rating?: {
        value: number;

    } | null;
}

export const getUserRating = async (movieId: string): Promise<UserRatingData> => {
    try {

        return await customFetch<void, UserRatingData>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ratings/user/${movieId}`,
            {
                method: 'GET',

            }
        );
    } catch (error) {
        console.error('Fetch user rating error:', error);
        throw error;
    }
};