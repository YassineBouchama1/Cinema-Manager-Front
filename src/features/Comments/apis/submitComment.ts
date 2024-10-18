import customFetch from "@/utils/customFetch";

export interface CommentData {
    movieId: string;
    text: string;
}

interface CommentResponse {
    message: string;

}

export async function submitComment(commentData: CommentData): Promise<CommentResponse> {
    try {
        return await customFetch<CommentData, CommentResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/comment`,
            {
                method: 'POST',
                data: commentData,

            }
        );
    } catch (error) {
        console.error('Comment submission error:', error);
        throw error;
    }
}