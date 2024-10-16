import customFetch from "@/utils/customFetch";



export async function updateReservationAdmin(id: string): Promise<void> {
    try {
        return await customFetch<string, void>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation/${id}`,
            { method: 'PUT' }
        );
    } catch (error) {
        console.error('Update reservation error:', error);
        throw error;
    }
}