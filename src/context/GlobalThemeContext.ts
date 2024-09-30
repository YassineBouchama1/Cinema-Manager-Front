import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';


interface GlobalThemeState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
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
        }),
        {
            name: 'theme-sidebar-storage',
        }
    )
);
