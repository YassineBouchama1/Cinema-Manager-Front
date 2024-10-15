import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMovie } from '@/features/AdminMovie/apis/updateMovie'; // Import the update movie API
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Define the validation schema using zod
const UpdateMovieSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    duration: z.number().min(1, 'Running time must be at least 1 minute'),
    genre: z.string().min(1, 'Genre is required'),
});

export type UpdateMovieFormInputs = z.infer<typeof UpdateMovieSchema>;

const useUpdateMovieForm = (initialData: UpdateMovieFormInputs) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateMovieFormInputs>({
        resolver: zodResolver(UpdateMovieSchema),
        defaultValues: initialData, // Set default values from the initial data
    });
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [videoLink, setVideoLink] = useState('');

    const queryClient = useQueryClient();

    const updateMovieMutation = useMutation({
        mutationFn: updateMovie,
        onSuccess: (data) => {
            toast.success(data.message || 'Movie updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['movies-admin'] }); // Refresh movies
            reset(); // Reset the form fields
            setCoverImage(null); // Reset cover image
            setVideo(null); // Reset video
            setVideoLink(''); // Reset video link
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit: SubmitHandler<UpdateMovieFormInputs> = (data) => {
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

        updateMovieMutation.mutate(formData); // Pass formData to the mutation
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
        isLoading: updateMovieMutation.isPending,
    };
};

export default useUpdateMovieForm;