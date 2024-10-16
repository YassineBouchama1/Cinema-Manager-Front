import { IUser } from "@/types/user";
import customFetch from "@/utils/customFetch";
import { UpdateData } from "../hooks/useUserManagement";

interface updateUserAdminResponse {
    message: string;
    data?: IUser;
}




export async function updateUserAdmin(data: UpdateData, id: string): Promise<updateUserAdminResponse> {
    try {
        return await customFetch<UpdateData, updateUserAdminResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/${id}`,
            { method: 'PUT', data }
        );
    } catch (error) {
        console.error('Update showtime error:', error);
        throw error;
    }
}