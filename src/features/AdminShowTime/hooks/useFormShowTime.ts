
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useShowTimeFormStore } from '../store/showTimeFormStore';
import { showTimeDataForm, updateShowTime } from '../apis/updateShowTime';
import { createShowTime } from '../apis/createShowTime';
import { showTimesSchemaData, validateShowTimeData } from '../validators';

const useFormShowTime = () => {
    const { isUpdateMode, roomId, movieId, resetForm, price, startAt, iDShowTime } = useShowTimeFormStore();






    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: showTimesSchemaData) => {
            console.log('Submitting data:', data);


            if (isUpdateMode) {
                return await updateShowTime(data, iDShowTime);
            } else {
                return await createShowTime(data);
            }
        },
        onSuccess: (data) => {
            toast.success(data.message || (isUpdateMode ? 'Showtime updated successfully!' : 'Showtime created successfully!'));
            queryClient.invalidateQueries({ queryKey: ['showtimes-admin'] });

            resetForm() // reset store state
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = () => {



        const data: showTimesSchemaData = {
            price,
            startAt,
            movieId,
            roomId,
        };


        try {
            validateShowTimeData(data);
            mutation.mutate(data);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return {

        onSubmit,

    };
};

export default useFormShowTime;