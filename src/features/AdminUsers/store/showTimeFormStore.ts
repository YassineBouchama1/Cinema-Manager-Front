import { create } from 'zustand';
import { ShowTimeAdmin } from '@/types/showTime';

interface ShowTimeFormStore {
    movieId: string;
    roomId: string;
    price: number;
    startAt: string;
    iDShowTime: string;
    isUpdateMode: boolean;
    errors: Record<string, string>;
    resetForm: () => void;
    setUpdateMode: (updateMode: boolean) => void;
    setMovieId: (movieId: string) => void;
    setRoomId: (roomId: string) => void;
    setIdShowTime: (iDShowTime: string) => void;
    setPrice: (price: number) => void;
    setStartAt: (startAt: string) => void;
    setErrors: (errors: Record<string, string>) => void;

}

export const useShowTimeFormStore = create<ShowTimeFormStore>((set) => ({

    movieId: '',
    roomId: '',
    iDShowTime: '',
    price: 0,
    startAt: '',
    isUpdateMode: false,
    errors: {},
    setErrors: (errors) => set({ errors }),
    resetForm: () => set({ isUpdateMode: false, movieId: '', roomId: '', price: 0, startAt: '', iDShowTime: '', errors: {} }),
    setMovieId: (movieId: string) => set({ movieId }),
    setRoomId: (roomId: string) => set({ roomId }),
    setIdShowTime: (iDShowTime: string) => set({ iDShowTime }),
    setPrice: (price: number) => set({ price }),
    setStartAt: (startAt: string) => set({ startAt }),
    setUpdateMode: (updateMode: boolean) => set({ isUpdateMode: updateMode }),
}));