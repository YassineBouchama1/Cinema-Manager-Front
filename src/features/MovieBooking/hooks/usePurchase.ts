import { Dispatch, useCallback } from 'react';
import { ShowTime } from '@/types/showTime';
import { useAuthFormContext } from '@/context/AuthFormContext';
import { useAuthContext } from '@/Providers/AuthProvider';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeReservation, ReservationData } from '../apis/makeReservation';
import { useRouter } from 'next/navigation';


type SetSelectedSeatsFunction = React.Dispatch<React.SetStateAction<number[]>>;


export const usePurchase = (selectedShowTime: ShowTime | null, selectedSeats: number[], setSelectedSeats: SetSelectedSeatsFunction) => {
    const { openModelAuth } = useAuthFormContext();
    const { session } = useAuthContext();
    const router = useRouter();
    const queryClient = useQueryClient();

    // this using react query for mutate with backend
    const reservationMutation = useMutation({
        mutationFn: (reservationData: ReservationData) => makeReservation(reservationData),
        onSuccess: (data) => {
            console.log(data);
            toast.success(data.message || 'Reservation successful!');

            // refresh the page
            router.refresh();

            // invalidate and refetch the movie-booking query
            queryClient.invalidateQueries({ queryKey: ['movie-booking'] });
            setSelectedSeats([])
            // router.push('/profile');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleBuy = useCallback(async () => {
        // check if user is logged in

        console.log(session?.token)
        if (!session?.token) {

            openModelAuth();
            toast.error('You should be logged in to purchase a ticket');
            return;
        }

        if (selectedShowTime) {
            const buyData = {
                showTimeId: selectedShowTime._id,
                seats: selectedSeats,
            };
            await reservationMutation.mutate(buyData);
            console.log('Buy Data:', buyData);
        } else {
            toast.error('No showtime selected.');
        }
    }, [selectedShowTime, selectedSeats, session, openModelAuth, reservationMutation]);

    return {
        handleBuy,
        loadingPurchase: reservationMutation.isPending,
        errorPurchase: reservationMutation.error,
    };
};