'use server';

import { getSession } from '@/lib/getSessions';
import api from '@/utils/api';
import { schemaLogin } from '@/validators/auth';

interface LoginResult {
    success?: 'login' | 'email';
    error?: string;
    errorZod?: Record<string, string[]>;
}


export async function login(formData: FormData): Promise<LoginResult> {




    const validatedFields = schemaLogin.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // console.log(validatedFields.error)

    // check if data validate 
    if (!validatedFields.success) {
        return {
            errorZod: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {


        const response = await api({
            url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
            method: 'POST',
            data: formData,
            isFormData: false
        });


        const data = await response.json();

        if (data.user.status !== 'active') {
            return { error: 'Your account is not active' };
        }


        //call setion to fil it with data user
        const session = await getSession();

        // Update session
        Object.assign(session, {
            userId: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            isLoggedIn: true,
            token: data.token,
        });
        await session.save();


        // return succ
        return { success: data };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }

        return { error: 'An unexpected error occurred' };
    }
}