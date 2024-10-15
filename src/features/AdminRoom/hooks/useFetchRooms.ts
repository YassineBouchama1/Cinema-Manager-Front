'use client';
import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { getRoomsAdmin } from '../apis/getMoviesAdmin';

export const useFetchRooms = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isFiltering, setIsFiltering] = useState(false);

    // memoizing search parameters to avoid recalculation every render
    //TODO : add filtering in backedn for room
    const searchParamsMemo = useMemo(() => Object.fromEntries(searchParams), [searchParams]);

    // fetching list of rooms
    const { data: rooms, isLoading, error, refetch } = useQuery({
        queryKey: ['rooms-admin', searchParamsMemo],
        queryFn: () => getRoomsAdmin(searchParamsMemo),
    });

    // this function is for filtering rooms
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
        await refetch(); // manually refetch after updating the URL
        setIsFiltering(false);
    }, [searchParams, router, refetch]);

    return {
        rooms,
        isLoading,
        error,
        isFiltering,
        handleFilter,
    };
};