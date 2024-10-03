import { create } from 'zustand';


type AuthField = 'login' | 'register';

interface AuthContextState {
    isModelAuthOpen: boolean;
    openModelAuth: () => void;
    closeModelAuth: () => void;
    authField: AuthField;
    setAuthField: (field: AuthField) => void;
}

export const useAuthContext = create<AuthContextState>((set) => ({
    isModelAuthOpen: false,
    openModelAuth: () => set({ isModelAuthOpen: true }),
    closeModelAuth: () => set({ isModelAuthOpen: false }),
    authField: 'login', // login from is default 
    setAuthField: (field: AuthField) => set({ authField: field }),
}));