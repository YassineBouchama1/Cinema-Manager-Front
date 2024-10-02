'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterMovie from './FilterMovie';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import MovieCard from './MovieCard';

import MovieBooking from '../movieBooking';
import { Movie } from '@/types/movie';
import { getMovies } from '@/hooks/useMovies';
import Pagnation from './Pagnation';
import DragCloseDrawer from '../commen/DragCloseDrawer';

const MovieRecommendations: React.FC = () => {



    const { isModelOpen, toggleModel } = useGlobalTheme();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isFiltering, setIsFiltering] = useState(false);




    // fetching lst of movies
    const { data, isLoading, error, refetch } = useQuery<{ data: Movie[] }>({
        queryKey: ['movies', Object.fromEntries(searchParams)],
        queryFn: () => getMovies(Object.fromEntries(searchParams)),
        enabled: !isFiltering, // disable automatic refetching when filtering 
    });



    // func for filter movies
    const handleFilter = async (filters: Record<string, string>) => {
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
    };


    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="text-white pt-6 h-full">
            <FilterMovie onFilter={handleFilter} />

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Coming Soon</h2>

                {isFiltering && <div>Loading...</div>}

                {!isFiltering && (
                    <div className="flex gap-4 flex-wrap w-full p-4 md:p-2 xl:p-5 justify-center">
                        {data?.data.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                )}
                <Pagnation />
            </div>

            {/* <DragCloseDrawer isOpen={!!isModelOpen} onClose={toggleModel}>
                <MovieBooking />
            </DragCloseDrawer> */}
        </div>
    );
};

export default MovieRecommendations;