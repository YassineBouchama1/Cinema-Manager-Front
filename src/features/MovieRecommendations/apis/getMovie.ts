import customFetch from "@/utils/customFetch";


interface MovieData {
    message: string;
    data?: any;
}

export const getMovie = async (id: string): Promise<MovieData> => {
    try {
        return await customFetch<void, MovieData>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/movie/${id}`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get movie error:', error);
        throw error;
    }
};