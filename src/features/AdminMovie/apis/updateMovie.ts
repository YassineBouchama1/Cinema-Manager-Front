import customFetch from "@/utils/customFetch";

interface UpdateMovieResponse {
    message: string;
    data?: any;
}

export async function updateMovie(formData: FormData): Promise<UpdateMovieResponse> {
    try {
        return await customFetch<FormData, UpdateMovieResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie`, // Adjust the URL as needed
            {
                method: 'PUT', // Use PUT for updating
                data: formData,
                isFormData: true
            }
        );
    } catch (error) {
        console.error('Update movie error:', error);
        throw error;
    }
}