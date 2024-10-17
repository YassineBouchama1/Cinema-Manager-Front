import { FavoriteType } from "@/types/favorite";
import customFetch from "@/utils/customFetch";


interface FavoriteData {
    message?: string,
    data: FavoriteType[]
}

export const getfavorites = async (): Promise<FavoriteData> => {
    try {
        return await customFetch<void, FavoriteData>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/favorite`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get favorites error:', error);
        throw error;
    }
};