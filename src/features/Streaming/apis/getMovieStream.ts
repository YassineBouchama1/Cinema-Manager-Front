import customFetch from "@/utils/customFetch";


interface GetMovieStreamData {
    message: string;
    showtimes?: any[];
}

export const getMovieStream = async (id: string): Promise<GetMovieStreamData> => {
    try {
        return await customFetch<void, GetMovieStreamData>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie/stream/${id}`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get movie stream error:', error);
        throw error;
    }
};