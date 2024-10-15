import customFetch from "@/utils/customFetch";

export const removeRoom = async (roomId: string): Promise<void> => {
    try {
        await customFetch<void>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/room/${roomId}`,
            {
                method: 'DELETE',
            }
        );
    } catch (error) {
        console.error('Error removing room:', error);
        throw error;
    }
};