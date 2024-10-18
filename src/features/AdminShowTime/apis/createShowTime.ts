import customFetch from "@/utils/customFetch";
import { showTimesSchemaData } from "../validators";

interface ShowTimeResponse {
    message: string;

}

export async function createShowTime(data: showTimesSchemaData): Promise<ShowTimeResponse> {
    try {
        return await customFetch<showTimesSchemaData, ShowTimeResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/showtime`,
            { method: 'POST', data }
        );
    } catch (error) {
        console.error('Error creating showtime:', error);
        throw error;
    }
}