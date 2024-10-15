import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMovie } from '@/features/AdminMovie/apis/createMovie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Define the validation schema using zod
const CreateMovieSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    duration: z.number().min(1, 'Running time must be at least 1 minute'),
    genre: z.string().min(1, 'Genre is required'),
});

export type CreateMovieFormInputs = z.infer<typeof CreateMovieSchema>;

const useCreateMovieForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateMovieFormInputs>({
        resolver: zodResolver(CreateMovieSchema),
    });
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [videoLink, setVideoLink] = useState('');

    const queryClient = useQueryClient();

    const CreateMovieMutation = useMutation({
        mutationFn: createMovie,
        onSuccess: (data) => {
            toast.success(data.message || 'Movie Created successfully!');
            queryClient.invalidateQueries({ queryKey: ['movies-admin'] }); // refresh movies
            reset(); // reset the form fields
            setCoverImage(null); // reset cover image
            setVideo(null); // reset video
            setVideoLink(''); // r video link
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
        formData.append('duration', String(data.duration));
        formData.append('genre', data.genre);

        // Append files if they exist
        if (coverImage) {
            formData.append('image', coverImage);
        }

        if (video) {
            formData.append('video', video);
        }
        if (videoLink) {
            formData.append('videoLink', videoLink);
        }

        CreateMovieMutation.mutate(formData); // Pass formData to the mutation
    };

    const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file); // Sstore the File object directly
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
        isLoading: CreateMovieMutation.isPending,
    };
};

export default useCreateMovieForm;