// context/AuthProvider.tsx
'use client';
import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useCallback,
} from "react";
import { SessionData } from "@/lib/optionsSessions";
import { clearSession, getSession } from "@/lib/sessions";
import { useRouter } from "next/navigation";
import { updateUserSession } from "@/utils/sessionManager";

type Session = SessionData | null;
type GlobalContext = {
    session: Session;
    setSession: React.Dispatch<React.SetStateAction<Session>>;
    loading: boolean;
    logout: () => void;
    onUpdateSession: (data: { isSubscribe: boolean }) => Promise<void>; // Update the type
};

export const GlobalContext = createContext<GlobalContext | null>(null);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [session, setSession] = useState<Session>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    // Function to get session data
    const fetchSessions = useCallback(async () => {
        setLoading(true);
        const sessionData = await getSession();
        setSession(sessionData);
        setLoading(false);
    }, []);

    const logout = async () => {
        setLoading(true);
        await clearSession();
        setSession(null);
        setLoading(false);
        router.refresh();
    };

    const onUpdateSession = useCallback(async (data: { isSubscribe: boolean }) => {
        setLoading(true);
        try {
            const updatedSession = await updateUserSession(data);
            setSession(updatedSession);
        } catch (error) {
            console.error("Failed to update session:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Before render, get session
    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    return (
        <GlobalContext.Provider value={{ session, setSession, loading, logout, onUpdateSession }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function useAuthContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}