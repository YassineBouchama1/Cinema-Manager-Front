import { create } from 'zustand';

interface UserAdminDashStore {
    isModalOpen: boolean;
    currentModal: 'profile' | 'comment' | null;
    openModal: (modalType: null | 'profile' | 'comment') => void;
    closeModal: () => void;
    userId: string,
    setUserId: (userId: string) => void;
}

export const useUserAdminDashStore = create<UserAdminDashStore>((set) => ({
    userId: '',
    isModalOpen: false,
    currentModal: null,
    setUserId: (userId: string) => set({ userId: userId }),
    openModal: (modalType = 'profile',) => set({ isModalOpen: true, currentModal: modalType }),
    closeModal: () => set({ isModalOpen: false, currentModal: null }),
}));