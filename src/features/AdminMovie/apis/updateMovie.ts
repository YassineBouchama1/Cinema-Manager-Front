import customFetch from "@/utils/customFetch";

interface UpdateMovieResponse {
    message: string;
    data?: any;
}

export async function updateMovie(formData: FormData, id: string): Promise<UpdateMovieResponse> {
    try {
        return await customFetch<FormData, UpdateMovieResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie/${id}`,
            {
                method: 'PUT',
                data: formData,
                isFormData: true
            }
        );
    } catch (error) {
        console.error('Update movie error:', error);
        throw error;
    }
}