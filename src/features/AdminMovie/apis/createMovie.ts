import customFetch from "@/utils/customFetch";

interface RegisterResponse {
    data: any
    message: string;
}

export async function createMovie(formData: FormData): Promise<RegisterResponse> {
    try {
        return await customFetch<FormData, RegisterResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie`,
            {
                method: 'POST',
                data: formData,
                isFormData: true
            }
        );
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

