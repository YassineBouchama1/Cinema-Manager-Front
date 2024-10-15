import { ShowTimeAdmin } from "@/types/showTime";
import customFetch from "@/utils/customFetch";

interface UpdateShowTimeResponse {
    message: string;
    data?: any;
}

export async function updateShowTime(data: ShowTimeAdmin, id: string): Promise<UpdateShowTimeResponse> {
    try {
        return await customFetch<ShowTimeAdmin, UpdateShowTimeResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/showtime/${id}`,
            { method: 'PUT', data }
        );
    } catch (error) {
        console.error('Update showtime error:', error);
        throw error;
    }
}