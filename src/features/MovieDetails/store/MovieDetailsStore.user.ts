import { create } from 'zustand';

interface Movie {
    name: string;
    id: string;
}

interface MovieDetailsStore {
    isModalSwapperOpen: boolean;
    currentModalSwapper: 'showtimes' | 'streaming' | null;
    openModalSwapper: (modalSwapperType: null | 'showtimes' | 'streaming') => void;
    closeModalSwapper: () => void;
    movie: Movie;
    setMovie: (name: string, id: string) => void;
}

export const useMovieDetailsStore = create<MovieDetailsStore>((set) => ({
    isModalSwapperOpen: false,
    currentModalSwapper: null,
    movie: {
        name: '',
        id: ''
    },
    openModalSwapper: (modalSwapperType) => set({ isModalSwapperOpen: true, currentModalSwapper: modalSwapperType }),
    closeModalSwapper: () => set({ isModalSwapperOpen: false, currentModalSwapper: null }),
    setMovie: (name, id) => set({ movie: { name, id } }),
}));