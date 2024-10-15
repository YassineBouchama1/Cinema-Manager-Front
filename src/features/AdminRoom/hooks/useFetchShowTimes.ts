import { useQuery } from '@tanstack/react-query';
import { getShowTimesAdmin } from '../apis/getShowTimes';

export const useFetchShowTimes = () => {
    const { data: showTimes, isLoading, error } = useQuery({
        queryKey: ['showtimes-admin'],
        queryFn: ()=>getShowTimesAdmin,
    });

    return { showTimes, isLoading, error };
};