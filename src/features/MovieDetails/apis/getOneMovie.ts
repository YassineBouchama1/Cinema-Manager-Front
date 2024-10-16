import { Movie } from "@/types/movie";
import customFetch from "@/utils/customFetch";


interface MovieData {
    message: string;
    data?: Movie;
}

export const getOneMovie = async (id: string): Promise<MovieData> => {
    try {
        return await customFetch<void, MovieData>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie/${id}`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get movie error:', error);
        throw error;
    }
};