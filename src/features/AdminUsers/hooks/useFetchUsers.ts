import { useQuery } from '@tanstack/react-query';
import { getUsersAdmin } from '../apis/getUsersAdmin';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const useFetchUsers = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const [isFiltering, setIsFiltering] = useState(false);
    const searchParamsMemo = useMemo(() => Object.fromEntries(searchParams), [searchParams]);


    const { data: users, isLoading, error, refetch } = useQuery({
        queryKey: ['users-admin'],
        queryFn: () => getUsersAdmin(searchParamsMemo),
    });


    // Fthis funnction for filtering movies 
    const handleFilter = useCallback(async (filters: Record<string, string>) => {
        setIsFiltering(true);
        const newSearchParams = new URLSearchParams(searchParams);

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                newSearchParams.set(key, value);
            } else {
                newSearchParams.delete(key);
            }
        });

        router.push(`?${newSearchParams.toString()}`);
        await refetch(); // Manually refetch after updating the URL
        setIsFiltering(false);
    }, [searchParams, router, refetch]);

    return {
        users, isLoading, error, isFiltering,
        handleFilter,
    };
};