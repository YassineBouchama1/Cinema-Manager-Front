import { MovieData } from '@/types';
import { Movie } from '@/types/movie';
import api from '@/utils/api';
import { delay } from '@/utils/delay';


interface MovieResponse {
    showTimes: unknown;
    data: Movie;
}

export const getMovies = async (params?: Record<string, string | string[] | undefined>) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    await delay(2000);
    return api<unknown, MovieResponse>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/movie?${queryString}`,
        method: 'GET',
        isFormData: false
    });
};



export const getMovie = async (id: string) => {

    return api<unknown, MovieData>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/movie/${id}`,
        method: 'GET',
        isFormData: false
    });
};