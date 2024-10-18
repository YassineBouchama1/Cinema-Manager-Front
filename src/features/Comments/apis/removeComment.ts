import customFetch from "@/utils/customFetch";

interface RemoveCommentResponse {
    message: string;

}


export async function removeComment(commentId: string): Promise<RemoveCommentResponse> {
    try {
        return await customFetch<null, RemoveCommentResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/comment/${commentId}`,
            {
                method: 'DELETE',
                data: null,
            }
        );
    } catch (error) {
        console.error('Comment removal error:', error);
        throw error;
    }
}