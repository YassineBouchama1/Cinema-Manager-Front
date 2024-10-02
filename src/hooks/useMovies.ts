import { Movie } from '@/types/movie';
import api from '@/utils/api';


interface MovieResponse {
    data: Movie;
}

export const getMovies = async (params: Record<string, string | string[] | undefined>) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return api<unknown, MovieResponse>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/movie?${queryString}`,
        method: 'GET',
        isFormData: false
    });
};


export const getMovie = async (id: string) => {

    return api<unknown, MovieResponse>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/movie/${id}`,
        method: 'GET',
        isFormData: false
    });
};