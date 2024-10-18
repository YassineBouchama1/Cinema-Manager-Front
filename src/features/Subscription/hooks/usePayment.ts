import { useCallback } from 'react';
import { useAuthFormContext } from '@/context/AuthFormContext';
import { useAuthContext } from '@/Providers/AuthProvider';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { paySubscription } from '../apis/paySubscription';
import { useSubscriptionContext } from '@/context/user/SubscriptionContext';

export const usePayment = () => {
    const { openModelAuth, setAuthFormField } = useAuthFormContext();
    const { closeModalSubscription } = useSubscriptionContext();
    const { session, onUpdateSession } = useAuthContext(); // bring session containing user info

    // mutation for making a reservation
    const reservationMutation = useMutation({
        mutationFn: () => paySubscription(),
        onSuccess: (data) => {
            toast.success(data.message || 'Payment successful!');

            // update session of user after he subscribes  
            onUpdateSession();

     

            closeModalSubscription();  // after subscribing successfully hide modal 
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handlePay = useCallback(async () => {
        // check if user is logged in
        if (!session?.token) {
            setAuthFormField('login');
            openModelAuth();
            toast.error('You should be logged in to make a payment');
            return;
        }

        if (session.role !== 'user') {
            toast.error('You are not allowed to make a payment, you are not a normal user');
            return;
        }

        // call the mutation to make the reservation
        await reservationMutation.mutateAsync();
    }, [session, openModelAuth, reservationMutation, setAuthFormField]); // Added setAuthFormField to dependencies

    return {
        handlePay,
        loadingPayment: reservationMutation.isPending,
        errorPayment: reservationMutation.error,
    };
};