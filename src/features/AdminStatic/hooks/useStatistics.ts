import { useQuery } from '@tanstack/react-query';
import { fetchStatistics } from '../apis/fetchStatistics';

export const useStatistics = () => {
    // fetching statistics
    const { data: statistics, isLoading, error, refetch } = useQuery({
        queryKey: ['statistics'],
        queryFn: fetchStatistics,
    });

    return { statistics, isLoading, error, refetch };
};