
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMovie } from '@/features/AdminMovie/apis/createMovie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Define the validation schema using zod
const mediaSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    duration: z.number().min(1, 'Running time must be at least 1 minute'),
    genre: z.string().min(1, 'Genre is required'),
});

export type CreateMovieFormInputs = z.infer<typeof mediaSchema>;

const useCreateMovieForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateMovieFormInputs>({
        resolver: zodResolver(mediaSchema),
    });
    const [coverImage, setCoverImage] = useState<File | null>(null); // Change to File
    const [video, setVideo] = useState<File | null>(null);
    const [videoLink, setVideoLink] = useState('');

    const queryClient = useQueryClient();

    const CreateMovieMutation = useMutation({
        mutationFn: createMovie,
        onSuccess: (data) => {
            toast.success(data.message || 'Movie Created successfully!');
            queryClient.invalidateQueries({ queryKey: ['movies-admin'] }); // Refresh movies
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit: SubmitHandler<CreateMovieFormInputs> = (data) => {
        const formData = new FormData();

        // Append form fields
        formData.append('name', data.title);
        formData.append('description', data.description);
        formData.append('duration', String(data.duration)); // Convert duration to string
        formData.append('genre', data.genre);

        // Append files if they exist
        if (coverImage) {
            formData.append('image', coverImage); // Append the File object directly
        }

        if (video) {
            formData.append('video', video); // Append the File object directly
        }
        if (videoLink) {
            formData.append('videoLink', videoLink);
        }

        console.log(formData.get('name'));
        CreateMovieMutation.mutate(formData); // Pass formData to the mutation
    };

    const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file); // Store the File object directly
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        handleCoverImageUpload,
        coverImage,
        setVideo,
        setVideoLink,
        isLoading: CreateMovieMutation.isPending

    };
};

export default useCreateMovieForm;