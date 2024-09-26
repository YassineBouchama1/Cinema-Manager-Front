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