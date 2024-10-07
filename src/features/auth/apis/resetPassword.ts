import { BackendError } from "@/types/errors";

interface ResetPasswordResponse {
    message: string;
}


export async function resetPassword(password: string, token: string): Promise<ResetPasswordResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset?tokenPass=${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        const data = await response.json();

        if (!response.ok) {
            const error: BackendError = data;

            // Check for token expiration error
            if (error.statusCode === 401 && error.message === "Your token has expired, please login again") {
                throw new Error("Your session has expired. Please log in again to reset your password.");
            }

            if (error.errors) {



                // Validation errors
                const errorMessages = error.errors.map(err => `${err.path}: ${err.msg}`).join(', ');
                throw new Error(errorMessages);
            } else if (error.message) {
                // general error message
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