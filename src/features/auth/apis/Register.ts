import { RegisterFormData } from "@/features/auth/validators/auth";
import customFetch from "@/utils/customFetch";

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
    return await customFetch<RegisterFormData, RegisterResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
      {
        method: 'POST',
        data: formData,
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}