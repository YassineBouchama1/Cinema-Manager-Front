import { create } from 'zustand';

interface UserModalSwapperState {
    isModalSwapperOpen: boolean;
    currentModalSwapper: 'showtimes' | 'streaming' | null;
    openModalSwapper: (modalSwapperType: null | 'showtimes' | 'streaming') => void;
    closeModalSwapper: () => void;
}

export const useUserModalSwapperContext = create<UserModalSwapperState>((set) => ({
    isModalSwapperOpen: false,
    currentModalSwapper: null,
    openModalSwapper: (modalSwapperType) => set({ isModalSwapperOpen: true, currentModalSwapper: modalSwapperType }),
    closeModalSwapper: () => set({ isModalSwapperOpen: false, currentModalSwapper: null }),
}));