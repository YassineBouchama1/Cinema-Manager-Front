import { useCallback } from 'react';
import { useAuthFormContext } from '@/context/AuthFormContext';
import { useAuthContext } from '@/Providers/AuthProvider';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { paySubscription, PaySubscriptionParams } from '../apis/paySubscription';
import { useSubscriptionContext } from '@/context/user/SubscriptionContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export const usePayment = () => {
    const { openModelAuth, setAuthFormField } = useAuthFormContext();
    const { closeModalSubscription } = useSubscriptionContext();
    const { session, onUpdateSession } = useAuthContext();

    const checkoutMutation = useMutation({
        mutationFn: (subscribeData: PaySubscriptionParams) => paySubscription(subscribeData),
        onSuccess: async (data) => {
            console.log(data)
            try {

                const stripe = await stripePromise;
                if (!stripe) {
                    throw new Error('Failed to initialize Stripe');
                }

                const result = await stripe.redirectToCheckout({
                    sessionId: data.id
                });

                if (result.error) {
                    throw new Error(result.error.message);
                }

                // These lines will only execute if the redirect fails
                onUpdateSession();
                closeModalSubscription();
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Payment failed');
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to process payment');
        },
    });

    const handlePay = useCallback(async (planId: string) => {
        if (!session?.token) {
            setAuthFormField('login');
            openModelAuth();
            toast.error('Please log in to make a payment');
            return;
        }

        if (session.role !== 'user') {
            toast.error('Only regular users can make payments');
            return;
        }

        checkoutMutation.mutate({ planId });
    }, [session, openModelAuth, checkoutMutation, setAuthFormField]);

    return {
        handlePay,
        loadingPayment: checkoutMutation.isPending,
        errorPayment: checkoutMutation.error,
    };
};