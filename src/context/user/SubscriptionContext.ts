import { create } from 'zustand';

interface SubscriptionState {
    isModalSubscriptionOpen: boolean;
    currentModalSubscription: 'paymentForm' | null;
    openModalSubscription: (modalType: null | 'paymentForm') => void;
    closeModalSubscription: () => void;
}

export const useSubscriptionContext = create<SubscriptionState>((set) => ({
    isModalSubscriptionOpen: false,
    currentModalSubscription: null,
    openModalSubscription: (modalType) => set({ isModalSubscriptionOpen: true, currentModalSubscription: modalType }),
    closeModalSubscription: () => set({ isModalSubscriptionOpen: false, currentModalSubscription: null }),
}));