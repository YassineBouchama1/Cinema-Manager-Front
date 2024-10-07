import customFetch from "@/utils/customFetch";

interface ResetPasswordResponse {
    message: string;
}

export async function resetPassword(password: string, token: string): Promise<ResetPasswordResponse> {
    try {
        return await customFetch<{ password: string }, ResetPasswordResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset?tokenPass=${token}`,
            {
                method: 'PUT',
                data: { password },
            }
        );
    } catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
}