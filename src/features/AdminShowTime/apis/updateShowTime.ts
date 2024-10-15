import { ShowTimeAdmin } from "@/types/showTime";
import customFetch from "@/utils/customFetch";
import { showTimesSchemaData } from "../validators";

interface UpdateShowTimeResponse {
    message: string;
    data?: any;
}


export interface showTimeDataForm {
    startAt: Date, movieId: string, roomId: string, price: number
}

export async function updateShowTime(data: showTimesSchemaData, id: string): Promise<UpdateShowTimeResponse> {
    try {
        return await customFetch<showTimesSchemaData, UpdateShowTimeResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/showtime/${id}`,
            { method: 'PUT', data }
        );
    } catch (error) {
        console.error('Update showtime error:', error);
        throw error;
    }
}