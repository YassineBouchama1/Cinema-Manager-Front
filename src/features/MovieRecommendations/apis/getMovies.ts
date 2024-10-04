import { BackendError } from "@/types/errors";
import { delay } from "@/utils/delay";

interface MovieResponse {
    message: string;
    data?: any;
}

export const getMovies = async (params?: Record<string, string | string[] | undefined>): Promise<MovieResponse> => {
    try {

        await delay(2000);

        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/movie?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        });

        const data = await response.json();

        if (!response.ok) {
            const error: BackendError = data;
            if (error.errors) {
                // Validation errors
                const errorMessages = error.errors.map(err => `${err.path}: ${err.msg}`).join(', ');
                throw new Error(errorMessages);
            } else if (error.message) {
                // General error message
                throw new Error(error.message);
            } else {
                throw new Error('An unexpected error occurred');
            }
        }

        return data as MovieResponse;
    } catch (error) {
        console.error('Get movies error:', error);
        throw error;
    }
};