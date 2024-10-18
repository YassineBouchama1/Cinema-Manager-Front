import { ShowTime } from "@/types/showTime";
import customFetch from "@/utils/customFetch";


interface ShowTimeData {
    message: string;
    showtimes: ShowTime[];
}

export const showTimesBelongMovie = async (id: string): Promise<ShowTimeData> => {

    console.log('from api')
    try {
        return await customFetch<ShowTimeData, ShowTimeData>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/showtime/public/${id}`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get movie error:', error);
        throw error;
    }
};