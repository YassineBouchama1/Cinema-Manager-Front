import { ShowTimeAdmin } from "@/types/showTime";
import customFetch from "@/utils/customFetch";

interface ShowTimeResponse {
    message: string;
    data?: any;
}

export async function createShowTime(data: ShowTimeAdmin): Promise<ShowTimeResponse> {
    try {
        return await customFetch<ShowTimeAdmin, ShowTimeResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/showtime`,
            { method: 'POST', data }
        );
    } catch (error) {
        console.error('Error creating showtime:', error);
        throw error;
    }
}