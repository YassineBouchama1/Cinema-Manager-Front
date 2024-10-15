import customFetch from "@/utils/customFetch";

export const removeShowTime = async (showTimeId: string): Promise<void> => {
    try {
        await customFetch<void>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/showtime/${showTimeId}`,
            { method: 'DELETE' }
        );
    } catch (error) {
        console.error('Error removing showtime:', error);
        throw error;
    }
};