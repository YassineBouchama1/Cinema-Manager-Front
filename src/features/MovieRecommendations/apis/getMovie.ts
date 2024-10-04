import { BackendError } from "@/types/errors";
import { delay } from "@/utils/delay";

interface MovieData {
    message: string;
    data?: any;
}

export const getMovie = async (id: string): Promise<MovieData> => {
    try {


   

        await delay(2000);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/movie/${id}`, {
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

        return data as MovieData;
    } catch (error) {
        console.error('Get movie error:', error);
        throw error;
    }
};