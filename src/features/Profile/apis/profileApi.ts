
import { IUser } from "@/types/user";
import customFetch from "@/utils/customFetch";

interface updateMyProfileApiResponse {
    message: string;

}




export async function updateMyProfileApi(formData: FormData): Promise<updateMyProfileApiResponse> {
    try {
        return await customFetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`,
            { method: 'PUT', data: formData, isFormData: true }
        );
    } catch (error) {
        console.error('Update My Profile error:', error);
        throw error;
    }
}




interface ProfileData {
    message?:string,
    data:IUser
}

export const getMyProfile = async (): Promise<ProfileData> => {
    try {
        return await customFetch<void, ProfileData>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/me`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get my profile error:', error);
        throw error;
    }
};