import { useCallback } from 'react';
import { ShowTime } from '@/types/showTime';
import { useAuthFormContext } from '@/context/AuthFormContext';
import { useAuthContext } from '@/Providers/AuthProvider';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { makeReservation, ReservationData } from '../apis/makeReservation';

export const usePurchase = (selectedShowTime: ShowTime | null, selectedSeats: number[]) => {

    const { openModelAuth } = useAuthFormContext();
    const { session } = useAuthContext();



    // useing react query for mutate with backend 
    const reservationMutation = useMutation({
        mutationFn: (reservationData: ReservationData) => makeReservation(reservationData),
        onSuccess: (data) => {
            toast.success(data.message || 'Reservation successful!');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });






    const handleBuy = useCallback(() => {


        // heck f user login or not
        if (!session?.token) {
            openModelAuth()
            toast.error('should be login to Purchase ticket')
            return
        }
        if (selectedShowTime) {
            const buyData = {
                showTimeId: selectedShowTime._id,
                seats: selectedSeats,
            };

            //
            reservationMutation.mutate(buyData);
            console.log('Buy Data:', buyData);
        } else {
            alert('No showtime selected.');
        }
    }, [selectedShowTime, selectedSeats, session]);

    return {
        handleBuy,
        loadingPurchase: reservationMutation.isPending,
        rrrorPurchase: reservationMutation.error,

    };
};