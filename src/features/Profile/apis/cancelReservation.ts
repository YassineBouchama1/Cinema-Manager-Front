import { getSession } from "@/lib/getSessions";

export const cancelReservation = async (reservationId: string): Promise<void> => {
    const session = await getSession();

    if (!session?.token) {
        throw new Error('Unauthorized, token required');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation/${reservationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel reservation');
    }
};