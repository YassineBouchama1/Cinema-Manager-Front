import { getSession } from "@/lib/getSessions";
import { delay } from "@/utils/delay";

export const cancelReservation = async (reservationId: string): Promise<void> => {
    const session = await getSession();
    console.log(session?.token)
    if (!session?.token) {
        throw new Error('Unauthorized, token required');
    }


    await delay(2000);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation/${reservationId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`,
        },
    });

    const data = await response.json(); // Parse the response

    if (!response.ok) {
        // Handle errors based on the response structure
        if (data.errors) {
            const errorMessages = data.errors.map(err => `${err.path}: ${err.msg}`).join(', ');
            throw new Error(errorMessages);
        } else {
            throw new Error(data.message || 'Failed to cancel reservation');
        }
    }

    // Optionally, you can log or handle the success message
    console.log(data.message); // "Update successful"
};