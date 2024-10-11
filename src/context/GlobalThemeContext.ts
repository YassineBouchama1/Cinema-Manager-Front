import { create } from 'zustand';

interface GlobalThemeState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isModelOpen: boolean;
    isLoading: boolean;
    openModel: (movieId: string) => void;
    closeModel: () => void;
    currentMovieId: string | false;
}

export const useGlobalTheme = create<GlobalThemeState>((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    isModelOpen: false,
    isLoading: false,
    currentMovieId: false,
    openModel: (movieId: string) => set({ isModelOpen: true, currentMovieId: movieId, isLoading: true }),
    closeModel: () => set({ isModelOpen: false, currentMovieId: false, isLoading: false }),

}));