import { create } from 'zustand';


// this responsible for decided wich modal wll open

type AuthFormField = 'login' | 'register' | 'forgotPassword' | 'resetPassword';

interface AuthFormContextState {
    isModelAuthOpen: boolean;
    openModelAuth: () => void;
    closeModelAuth: () => void;
    authFormField: AuthFormField;
    setAuthFormField: (field: AuthFormField) => void;
}

export const useAuthFormContext = create<AuthFormContextState>((set) => ({
    isModelAuthOpen: false,
    openModelAuth: () => set({ isModelAuthOpen: true }),
    closeModelAuth: () => set({ isModelAuthOpen: false }),
    authFormField: 'login', // login from is default 
    setAuthFormField: (field: AuthFormField) => set({ authFormField: field }),
}));