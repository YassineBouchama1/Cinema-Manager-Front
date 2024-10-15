import { Room } from "@/types/room"; // Adjust the import path as necessary
import customFetch from "@/utils/customFetch";

interface UpdateRoomResponse {
    message: string;
    data?: any;
}

export async function updateRoom(data: Room, id: string): Promise<UpdateRoomResponse> {
    try {
        return await customFetch<Room, UpdateRoomResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/room/${id}`,
            {
                method: 'PUT',
                data,
            }
        );
    } catch (error) {
        console.error('Update room error:', error);
        throw error;
    }
}