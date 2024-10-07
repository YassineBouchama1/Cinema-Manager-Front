import customFetch from "@/utils/customFetch";

interface CancelReservationResponse {
  message: string;
}

export const cancelReservation = async (reservationId: string): Promise<void> => {
  try {
    const response = await customFetch<void, CancelReservationResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reservation/${reservationId}`,
      {
        method: 'PUT',
      }
    );
    console.log(response.message); // update succe
  } catch (error) {
    console.error('Cancel reservation error:', error);
    throw error;
  }
};