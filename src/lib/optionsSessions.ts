
import { SessionOptions, getIronSession } from "iron-session";

//types of thata saveing in  sessions
export interface SessionData {
    userId?: string;
    name?: string;
    email?: string;
    role?: string | number;
    isActive?: boolean;
    isSubscribe?: boolean;
    isLoggedIn: boolean;
    token: string;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
    token: "",
    isSubscribe: false
};

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "yassine",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    },
};