import customFetch from "@/utils/customFetch";



export const getMovieStream = async (id: string) => {
    try {
        return await customFetch(
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