import customFetch from "@/utils/customFetch";

interface ForgotPasswordResponse {
  message: string;
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  try {
    return await customFetch<{ email: string }, ForgotPasswordResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/forget`,
      {
        method: 'POST',
        data: { email },
      }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
}