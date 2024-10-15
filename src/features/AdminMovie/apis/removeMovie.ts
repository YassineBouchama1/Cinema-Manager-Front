import customFetch from "@/utils/customFetch";

interface removeMovieResponse {
    message: string;
    data?: any;
}


export async function removeMovie(commentId: string): Promise<removeMovieResponse> {
    try {
        return await customFetch<null, removeMovieResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie/${commentId}`,
            {
                method: 'DELETE',

            }
        );
    } catch (error) {
        console.error('Comment removal error:', error);
        throw error;
    }
}