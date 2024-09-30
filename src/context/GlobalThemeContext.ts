import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface GlobalThemeState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isModelOpen: string | null; // Store movie ID or null
    toggleModel: (movieId?: string) => void; // Accept movie ID as an argument
}

type GlobalThemePersist = (
    config: StateCreator<GlobalThemeState>,
    options: PersistOptions<GlobalThemeState>
) => StateCreator<GlobalThemeState>;

export const useGlobalTheme = create<GlobalThemeState>()(
    (persist as GlobalThemePersist)(
        (set) => ({
            isSidebarOpen: false,
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            isModelOpen: null,
            toggleModel: (movieId?: string) =>
                set((state) => ({
                    isModelOpen: state.isModelOpen ? null : movieId || null
                })),
        }),
        {
            name: 'theme-sidebar-storage',
        }
    )
);
