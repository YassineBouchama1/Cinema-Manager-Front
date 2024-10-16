'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShowTimeFormStore } from '../store/showTimeFormStore';
import { showTimesSchemaData, validateShowTimeData } from '../validators';
import { useCallback } from 'react';
import { updateShowTime } from '../apis/updateShowTime';
import { createShowTime } from '../apis/createShowTime';

const useFormShowTime = () => {
    const { isUpdateMode, roomId, movieId, resetForm, price, startAt, iDShowTime, setErrors } = useShowTimeFormStore();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: showTimesSchemaData) => {
            console.log('Submitting data:', data);
            return isUpdateMode ? await updateShowTime(data, iDShowTime) : await createShowTime(data);
        },
        onSuccess: (data) => {
            toast.success(data.message || (isUpdateMode ? 'Showtime updated successfully!' : 'Showtime created successfully!'));
            queryClient.invalidateQueries({ queryKey: ['showtimes-admin'] });
            resetForm(); // reset store state
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = useCallback(() => {
        const data: showTimesSchemaData = { price, startAt, movieId, roomId };

        try {
            if (!validateShowTimeData(data, setErrors)) {
                return;
            }
            mutation.mutate(data);
        } catch (error: { message: string }) {
            toast.error(error.message);
        }
    }, [price, startAt, movieId, roomId, mutation, setErrors]);

    return { onSubmit, isLoading: mutation.isPending };
};

export default useFormShowTime;