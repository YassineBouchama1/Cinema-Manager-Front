import customFetch from "@/utils/customFetch";


interface ShowTimeData {
    message: string;
    data?: any;
}

export const getShowTime = async (id: string): Promise<ShowTimeData> => {
    try {
        return await customFetch<void, ShowTimeData>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/showtime/${id}`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get movie error:', error);
        throw error;
    }
};