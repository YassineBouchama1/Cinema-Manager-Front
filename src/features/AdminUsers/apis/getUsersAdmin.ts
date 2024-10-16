
import { IUser } from "@/types/user";
import customFetch from "@/utils/customFetch";

interface UsersResponse {
    message: string;
    data: IUser[]
}

export const getUsersAdmin = async (params?: Record<string, string | string[] | undefined>): Promise<UsersResponse> => {
    try {
        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        return await customFetch<void, UsersResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user?${queryString}`,
            { method: 'GET' }
        );
    } catch (error) {
        console.error('Get Users error:', error);
        throw error;
    }
};


