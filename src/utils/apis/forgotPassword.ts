import { delay } from "../delay";

interface ForgotPasswordResponse {
    message: string;
}

interface ValidationError {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

interface BackendError {
    errors?: ValidationError[];
    status?: string;
    error?: {
        statusCode: number;
        status: string;
        isOperational: boolean;
    };
    message?: string;
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {


        await delay(2000)


        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/forget`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            const error: BackendError = data;
            if (error.errors) {
                // Validation errors
                const errorMessages = error.errors.map(err => `${err.path}: ${err.msg}`).join(', ');
                throw new Error(errorMessages);
            } else if (error.message) {
                // General error message
                throw new Error(error.message);
            } else {
                throw new Error('An unexpected error occurred');
            }
        }

        return data as ForgotPasswordResponse;
    } catch (error) {
        console.error('Forgot password error:', error);
        throw error;
    }
}