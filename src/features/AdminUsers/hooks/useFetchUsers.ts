import { useQuery } from '@tanstack/react-query';
import { getUsersAdmin } from '../apis/getUsersAdmin';

export const useFetchUsers = () => {
    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users-admin'],
        queryFn: () => getUsersAdmin(),
    });

    return { users, isLoading, error };
};