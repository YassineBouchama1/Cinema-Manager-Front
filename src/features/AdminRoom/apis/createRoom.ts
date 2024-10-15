import { Room } from "@/types/room";
import customFetch from "@/utils/customFetch";

interface RoomResponse {
    data: Room;
    message: string;
}

export async function createRoom(data: Room): Promise<RoomResponse> {
    try {
        return await customFetch<Room, RoomResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/room`,
            {
                method: 'POST',
                data,
            }
        );
    } catch (error) {
        console.error('Error creating room:', error);
        throw error;
    }
}