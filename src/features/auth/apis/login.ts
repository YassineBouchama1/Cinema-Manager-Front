import { LoginFormData } from "@/features/auth/validators/auth";
import { setSession } from "@/lib/sessions";
import customFetch from "@/utils/customFetch";

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
        const loginData = await customFetch<LoginFormData, LoginResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
            {
                method: 'POST',
                data: formData,
            }
        );

        if (!loginData.data.isActive) {
            throw new Error('Your account is not active');
        }

        // set session data
        await setSession({
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