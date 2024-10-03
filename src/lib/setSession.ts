"use server";

import { getSession } from "./getSessions";


export const setSession = async (sessionData: {
    userId: string;
    name: string;
    email: string;
    role: string;
    isLoggedIn: boolean;
    token: string;
}) => {
    //call setion to fil it with data user
    const session = await getSession();

    // Update session
    Object.assign(session, {
        userId: sessionData.userId,
        name: sessionData.name,
        email: sessionData.email,
        role: sessionData.role,
        isLoggedIn: true,
        token: sessionData.token,
    });
    await session.save();

    console.log(session)
};