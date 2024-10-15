import { ShowTimeAdmin } from "@/types/showTime";
import customFetch from "@/utils/customFetch";

interface ShowTimeResponse {
    message: string;
    data: ShowTimeAdmin[];
}

export const getShowTimesAdmin = async (params?: Record<string, string | string[] | undefined>): Promise<ShowTimeResponse> => {
    try {
        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        return await customFetch<void, ShowTimeResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/showtime?${queryString}`,
            { method: 'GET' }
        );
    } catch (error) {
        console.error('Get showtimes error:', error);
        throw error;
    }
};


