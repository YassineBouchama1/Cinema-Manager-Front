import customFetch from "@/utils/customFetch";

interface Comment {
    id: string;
    name: string;
    avatar: string;
    date: string;
    datetime: string;
    text: string;
}

interface CommentsResponse {
    data: Comment[];
}

export const getComments = async (movieId: string): Promise<CommentsResponse> => {
    try {
        return await customFetch<void, CommentsResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/comment/movie/${movieId}`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Fetch comments error:', error);
        throw error;
    }
};