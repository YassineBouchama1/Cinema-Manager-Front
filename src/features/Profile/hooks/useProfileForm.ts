
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateMyProfileApi, getMyProfile } from "../apis/profileApi"; // Ensure both APIs are imported
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function useProfileForm() {
    const queryClient = useQueryClient();

    
    const [profileImage, setProfileImage] = useState<string>('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080');
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [oldPassword, setOldPassword] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    // fetch user profile data
    const { data, isLoading: loadingProfile, error } = useQuery({
        queryKey: ['user-profile'],
        queryFn: getMyProfile,
    });

    // populate form fields with fetched data
    useEffect(() => {
        if (data && data.data) { // check if data and data.data exist
            setName(data.data.name || '');
            setAddress(data.data.address || '');
            setProfileImage(data.data.avatar && `${process.env.NEXT_PUBLIC_IMAGE_URL}${data.data.avatar}` || profileImage);
            setEmail(data.data.email || '')
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => await updateMyProfileApi(formData),
        onSuccess: (data) => {
            toast.success(data.message || 'Profile updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['user-profile'] }); // Refresh user profile
            resetForm();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const resetForm = () => {
        setProfileImage('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080');
        setName('');
        setAddress('');
        setPassword('');
        setOldPassword('');
        setImageFile(null);
    };

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            setImageFile(file); // Store the file for FormData
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // create FormData object
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        // formData.append('password', password);
        // formData.append('oldPassword', oldPassword);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        // Use the mutation to submit the form data
        mutation.mutate(formData);
    };

    return {
        profileImage,
        name,
        address,
        password,
        oldPassword,
        handleProfileImageChange,
        handleSubmit,
        setName,
        setAddress,
        setPassword,
        setOldPassword,
        email,

        isLoading: loadingProfile || mutation.isPending,
        isError: error || mutation.isError,
        error: error || mutation.error,
    };
}