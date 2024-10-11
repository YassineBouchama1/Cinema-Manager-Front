'use client';
import React, { memo } from 'react';
import FilterMovie from './FilterMovie';
import MovieCard from './MovieCard';
import { Movie } from '@/types/movie';
import { useMovieRecommendations } from '../hooks/useMovieRecommendations';

const MovieRecommendations: React.FC = () => {
    const { movies, isLoading, error, isFiltering, handleFilter } = useMovieRecommendations();

    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="text-white pt-6 h-full min-h-[800px]">

            <FilterMovie onFilter={handleFilter} isFiltering={isFiltering} />
            {/* 
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Latest Movies</h2>

                {/* Loading while fetching 
            {isFiltering && (
                <div className="flex gap-4 flex-wrap w-full p-4 md:p-2 xl:p-5 justify-start">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <button key={i} className="md:w-60 w-full text-center animate-pulse">
                            <div className="rounded-xl w-full h-96 relative overflow-hidden bg-gray-800"></div>
                            <div className="mt-2 mb-4 h-4 bg-gray-800 rounded w-3/4"></div>
                        </button>
                    ))}
                </div>
            )}

            {!isFiltering && (
                <div className="flex gap-4 flex-wrap w-full p-4 md:p-2 xl:p-5 justify-start">
                    {!movies?.data && <p>There are no showtimes</p>}
                    {movies?.data && movies?.data.map((movie: Movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
        */}


        </div >
    );
};

export default memo(MovieRecommendations);