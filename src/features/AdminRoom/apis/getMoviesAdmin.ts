import { Room } from "@/types/room";
import customFetch from "@/utils/customFetch";

interface RoomResponse {
    message: string;
    data: Room[]; 
}

export const getRoomsAdmin = async (params?: Record<string, string | string[] | undefined>): Promise<RoomResponse> => {
    try {
        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        return await customFetch<void, RoomResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/room?${queryString}`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get rooms error:', error);
        throw error;
    }
};