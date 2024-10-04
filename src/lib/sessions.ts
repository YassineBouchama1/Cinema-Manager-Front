"use server";
import { getIronSession } from "iron-session";
import { SessionData, defaultSession, sessionOptions } from "./optionsSessions";
import { cookies } from "next/headers";





export const getSession = async () => {

    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }


    return session;
};


export const setSession = async (sessionData: SessionData) => {
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

