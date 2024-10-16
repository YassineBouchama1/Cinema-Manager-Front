'use client'
import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { getMoviesAdmin } from '../apis/getMoviesAdmin';

export const useFetchMovies = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isFiltering, setIsFiltering] = useState(false);

    // memoizing search parameters to avoid recalculation every rander
    const searchParamsMemo = useMemo(() => Object.fromEntries(searchParams), [searchParams]);

    // fetching list of movies
    const { data: movies, isLoading, error, refetch } = useQuery({
        queryKey: ['movies-admin', searchParamsMemo],
        queryFn: () => getMoviesAdmin(searchParamsMemo),
      
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
        movies,
        isLoading,
        error,
        isFiltering,
        handleFilter,
    };
};