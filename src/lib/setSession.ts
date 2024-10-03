"use server";

import { getSession } from "./getSessions";


export type SessionDayaStype = {
    userId: string;
    name: string;
    email: string;
    role: string;
    isLoggedIn: boolean;
    token: string;
}

export const setSession = async (sessionData: SessionDayaStype) => {
    // call session to fill  with user data
    const session = await getSession();

    // ipdate session
    Object.assign(session, {
        userId: sessionData.userId,
        name: sessionData.name,
        email: sessionData.email,
        role: sessionData.role,
        isLoggedIn: true,
        token: sessionData.token,
    });
    await session.save();

    console.log(session);
    return session;
};