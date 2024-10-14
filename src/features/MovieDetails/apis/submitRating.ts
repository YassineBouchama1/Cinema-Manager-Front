
import customFetch from "@/utils/customFetch";

export interface RatingData {
    movieId: string;
    value: number;
}

interface RatingResponse {
    message: string;
    data?: any;
}

export async function submitRating(ratingData: RatingData): Promise<RatingResponse> {
    try {
        return await customFetch<RatingData, RatingResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/rating`,
            {
                method: 'POST',
                data: ratingData,
            }
        );
    } catch (error) {
        console.error('Rating submission error:', error);
        throw error;
    }
}