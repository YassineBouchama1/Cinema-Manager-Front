import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ShowTimeAdmin } from '@/types/showTime';
import { useShowTimeFormStore } from '../store/showTimeFormStore';
import { updateShowTime } from '../apis/updateShowTime';
import { createShowTime } from '../apis/createShowTime';

const useFormShowTime = () => {
    const { currentShowTime, isUpdateMode } = useShowTimeFormStore();

    const schema = z.object({
        price: z.number().min(1, 'Price is required'),
        movieId: z.string().min(1, 'Movie ID is required'),
        roomId: z.string().min(1, 'Room ID is required'),
        startAt: z.date().refine(date => date > new Date(), {
            message: 'Start time must be in the future',
        }),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ShowTimeAdmin>({
        resolver: zodResolver(schema),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: ShowTimeAdmin) => {
            if (isUpdateMode && currentShowTime) {
                return await updateShowTime(data, currentShowTime._id);
            } else {
                return await createShowTime(data);
            }
        },
        onSuccess: (data) => {
            toast.success(data.message || (isUpdateMode ? 'Showtime updated successfully!' : 'Showtime created successfully!'));
            queryClient.invalidateQueries({ queryKey: ['showtimes-admin'] });
            reset();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit: SubmitHandler<ShowTimeAdmin> = (data) => {
        mutation.mutate(data);
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        reset,
    };
};

export default useFormShowTime;