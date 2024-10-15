import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CreateMovieFormInputs, CreateMovieSchema, UpdateMovieSchema } from '../validators';
import { useMovieFormStore } from '../store/movieFormStore';
import { updateMovie } from '../apis/updateMovie';
import { createMovie } from '../apis/createMovie';

const useFormMovie = () => {
    const { currentMovie, isUpdateMode, resetForm } = useMovieFormStore();

    const schema = isUpdateMode ? UpdateMovieSchema : CreateMovieSchema;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateMovieFormInputs>({
        resolver: zodResolver(schema),
    });

    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [videoLink, setVideoLink] = useState('');

    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            if (isUpdateMode && currentMovie) {
                // call updateMovie  with id
                return await updateMovie(formData, currentMovie._id);
            } else {
                // call createMovie than send formdata to it
                return await createMovie(formData);
            }
        },
        onSuccess: (data) => {
            toast.success(data.message || (isUpdateMode ? 'Movie updated successfully!' : 'Movie created successfully!'));
            queryClient.invalidateQueries({ queryKey: ['movies-admin'] }); // refresh movies


            reset(); // reset the form fields
            setCoverImage(null); // reset cover image
            setVideo(null); // reset video
            setVideoLink(''); // reset video link

            resetForm()//reset to create mode

        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit: SubmitHandler<CreateMovieFormInputs> = (data) => {
        const formData = new FormData();

        // append form fields
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('duration', String(data.duration));
        formData.append('genre', data.genre);

        // append files if they exist
        if (coverImage) {
            formData.append('image', coverImage);
        }

        if (video) {
            formData.append('video', video);
        }
        if (videoLink) {
            formData.append('videoLink', videoLink);
        }

        // call the mutation with the formData
        mutation.mutate(formData);
    };

    const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file); // store the File object directly
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
        isLoading: mutation.isPending,
        reset
    };
};

export default useFormMovie;