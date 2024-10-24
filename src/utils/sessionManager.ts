import { updateSession } from "@/lib/sessions";

export const updateUserSession = async (sessionData: { isSubscribe: boolean }) => {
    try {
        const updatedSession = await updateSession(sessionData);
        return updatedSession;
    } catch (error) {
        console.error("Error updating session:", error);
        throw error; 
    }
};