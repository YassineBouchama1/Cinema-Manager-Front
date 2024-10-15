import { create } from 'zustand';
import { ShowTime, ShowTimeAdmin } from '@/types/showTime';

interface ShowTimeFormStore {
    currentShowTime: ShowTimeAdmin | null;
    isUpdateMode: boolean;
    resetForm: () => void;
    setCurrentShowTime: (showTime: ShowTimeAdmin) => void;
    setUpdateMode: (updateMode: boolean) => void;
}

export const useShowTimeFormStore = create<ShowTimeFormStore>((set) => ({
    currentShowTime: null,
    isUpdateMode: false,
    resetForm: () => set({ currentShowTime: null, isUpdateMode: false }),
    setCurrentShowTime: (showTime) => set({ currentShowTime: showTime, isUpdateMode: true }),
    setUpdateMode: (updateMode) => set({ isUpdateMode: updateMode }),
}));