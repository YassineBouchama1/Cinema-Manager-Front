"use server";

import { getSession } from "@/lib/getSessions";

import fetchServer from "@/lib/fetch-server";
import { schemaLogin } from "@/validators/auth";

export const login = async (formData: FormData) => {
    const session = await getSession();

    //2-validation
    const validatedFields = schemaLogin.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    //check validation
    if (!validatedFields.success) {
        return {
            errorZod: validatedFields.error.flatten().fieldErrors,
        };
    }

    // fetch data
    try {
        const response: Response = await fetchServer({
            method: "POST",
            url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/auth/login",
            body: JSON.stringify(validatedFields.data),
        });


        const data = await response.json();


        // if user in active block them 
        if (data.user.status != "active") {
            return {
                error: "You Are Blocked",
            };
        }


        //assign data user to session
        session.userId = data.user.id;
        session.name = data.user.name;
        session.email = data.user.email;
        session.role = data.user.role;
        session.isLoggedIn = true;
        session.token = data?.token;
        await session.save();



        //after successfully
        return {
            success: "login",
            error: null,
        };
    } catch (error: any) {
        return {
            success: null,
            error: error.message,
        };
    }
};