import { BackendError } from "@/types/errors";

interface ResetPasswordResponse {
    message: string;
}



export async function resetPassword(password: string, token: string): Promise<ResetPasswordResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset?forget=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
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

        return data as ResetPasswordResponse;
    } catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
}