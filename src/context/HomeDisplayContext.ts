import { create } from 'zustand';

// thsis is responsible for deciding which page to display showtimes or movies

type HomeDisplayField = 'showtimes' | 'movies';

interface HomeDisplayContextState {
    homeDisplayField: HomeDisplayField;
    setHomeDisplayField: (field: HomeDisplayField) => void;
}

export const useHomeDisplayContext = create<HomeDisplayContextState>((set) => ({
    homeDisplayField: 'showtimes', // 'showtimes' is the defaulty
    setHomeDisplayField: (field: HomeDisplayField) => set({ homeDisplayField: field }),
}));