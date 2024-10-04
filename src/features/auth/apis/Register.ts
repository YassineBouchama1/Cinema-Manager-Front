import { RegisterFormData } from "@/features/auth/validators/auth";
import { delay } from "../../../utils/delay";
import { BackendError } from "@/types/errors";

interface RegisterResponse {
    data: {
        _id: string;
        name: string;
        email: string;
        role: string;
        isActive: boolean;
        cinemaId: string | null;
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    message: string;
}


export async function registerUser(formData: RegisterFormData): Promise<RegisterResponse> {
    try {


        await delay(2000)



        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, {
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
                // General error message
                throw new Error(error.message);
            } else {
                throw new Error('An unexpected error occurred');
            }
        }

        const registerData: RegisterResponse = data;

        return registerData;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}