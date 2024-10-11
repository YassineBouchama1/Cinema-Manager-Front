import { create } from 'zustand';
import { SessionData } from '@/lib/optionsSessions';
import { getSession } from '@/lib/sessions';

type Session = SessionData | null;

interface AuthState {
    session: Session;
    loading: boolean;
    fetchSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    loading: true,
    fetchSession: async () => {
        set({ loading: true });
        const sessionData = await getSession();
        set({ session: sessionData, loading: false });
    },
}));