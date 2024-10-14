import { create } from 'zustand';

interface UserModalState {
    isModalOpen: boolean;
    currentModal: 'showtimes' | 'streaming' | null;
    openModal: (modalType: null | 'showtimes' | 'streaming') => void;
    closeModal: () => void;
}

export const useUserModalContext = create<UserModalState>((set) => ({
    isModalOpen: false,
    currentModal: null,
    openModal: (modalType) => set({ isModalOpen: true, currentModal: modalType }),
    closeModal: () => set({ isModalOpen: false, currentModal: null }),
}));