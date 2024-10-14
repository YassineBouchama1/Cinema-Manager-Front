import { create } from 'zustand';

// This is responsible for deciding which page to display: showtimes or movies
type MovieDisplayField = 'showtimes' | 'streaming';

interface HomeDisplayContextState {
    movieDisplayField: MovieDisplayField;
    setMovieDisplayField: (field: MovieDisplayField) => void;
}

export const useMovieDisplayContext = create<HomeDisplayContextState>((set) => ({
    movieDisplayField: 'showtimes', // 'showtimes' is the default
    setMovieDisplayField: (field: MovieDisplayField) => set({ movieDisplayField: field }),
}));