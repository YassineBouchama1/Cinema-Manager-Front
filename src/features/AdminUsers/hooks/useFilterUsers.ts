
import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export const useFilterUsers = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isFiltering, setIsFiltering] = useState(false);
    const [search, setSearch] = useState('');

    const queryClient = useQueryClient();

    // Handle filtering logic
    const handleFilter = useCallback(async () => {
        setIsFiltering(true);
        const newSearchParams = new URLSearchParams(searchParams);

        if (search) {
            newSearchParams.set('search', search);
        } else {
            newSearchParams.delete('search');
        }

        // udate the URL with new search parameters
        router.push(`?${newSearchParams.toString()}`);
        queryClient.invalidateQueries({ queryKey: ['users-admin'] });
        setIsFiltering(false);

    }, [search, searchParams]);

    return {
        isFiltering,
        search,
        setSearch,
        handleFilter,
    };
};