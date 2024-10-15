import { create } from 'zustand';
import { Movie } from '@/types/movie';

interface MovieFormState {
    isUpdateMode: boolean;
    currentMovie: Movie | null;
    setUpdateMode: (isUpdate: boolean) => void;
    setCurrentMovie: (movie: Movie | null) => void;
    resetForm: () => void;
}

export const useMovieFormStore = create<MovieFormState>((set) => ({
    isUpdateMode: false,
    currentMovie: null,
    setUpdateMode: (isUpdate) => set({ isUpdateMode: isUpdate }),
    setCurrentMovie: (movie) => set({ currentMovie: movie }),
    resetForm: () => set({ isUpdateMode: false, currentMovie: null }),
}));