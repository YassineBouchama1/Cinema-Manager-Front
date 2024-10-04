import { SessionData } from "@/lib/optionsSessions";
import { setSession } from "@/lib/setSession";
import { delay } from "../../../utils/delay";
import { LoginFormData } from "@/features/auth/validators/auth";
import { useAuthContext } from "@/Providers/AuthProvider";
import { BackendError } from "@/types/errors";

interface LoginResponse {
    data: {
        _id: string;
        name: string;
        email: string;
        role: string;
        isActive: boolean;
        cinemaId: string;
    };
    token: string;
}



export async function loginUser(formData: LoginFormData): Promise<LoginResponse> {
    try {


        await delay(2000)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            const error: BackendError = data;
            if (error.errors) {
                // validation errors

                const errorMessages = error.errors.map(err => `${err.path}: ${err.msg}`).join(', ');
                throw new Error(errorMessages);
            } else if (error.message) {


                // general error message
                throw new Error(error.message);
            } else {
                throw new Error('An unexpected error occurred');
            }
        }

        const loginData: LoginResponse = data;

        if (!loginData.data.isActive) {
            throw new Error('Your account is not active');
        }

        // set session data <coockis>
        const sessionUpdated = await setSession({
            userId: loginData.data._id,
            name: loginData.data.name,
            email: loginData.data.email,
            role: loginData.data.role,
            isLoggedIn: true,
            token: loginData.token,
        });



        return loginData;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}