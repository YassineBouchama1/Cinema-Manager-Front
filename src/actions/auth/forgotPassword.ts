"use server";

import fetchServer from "@/lib/fetch-server";
import { schemaEmail } from "@/validators/auth";

export const forgotPassword = async (formData: FormData) => {
    //2-validation
    const validatedFields = schemaEmail.safeParse({
        email: formData.get("email"),
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
            url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "auth/forgot-password",
            body: JSON.stringify(validatedFields.data),
        });


        //after successfully
        return {
            success: "Sent",
            error: null,
        };
    } catch (error: any) {
        return {
            success: null,
            error: error.message,
        };
    }
};