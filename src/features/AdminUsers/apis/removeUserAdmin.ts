import customFetch from "@/utils/customFetch";

export const removeUserAdmin = async (userId: string): Promise<void> => {
    try {
        await customFetch<void>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/${userId}`,
            { method: 'DELETE' }
        );
    } catch (error) {
        console.error('Error removing user:', error);
        throw error;
    }
};