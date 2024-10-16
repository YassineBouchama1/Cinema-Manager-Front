import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateReservationAdmin } from '../apis/updateReservationAdmin';

export const useReservationMutation = (reservationId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateReservationAdmin( reservationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reservations-admin'] });
            toast.success('Reservation updated successfully!');
        },
        onError: (error) => {
            toast.error(`Error updating Reservation: ${error.message}`);
        },
    });
};