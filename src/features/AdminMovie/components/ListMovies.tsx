'use client';
import { Movie } from '@/types/movie';
import React, { useState, useCallback, useMemo } from 'react';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeMovie } from '../apis/removeMovie';
import MovieCardAdmin from './MovieCardAdmin';
import FilterMoviesAdmin from './FilterMoviesAdmin';

export default function ListMovies() {
    const [loadingMovieId, setLoadingMovieId] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { movies, isLoading, error, isFiltering, handleFilter } = useFetchMovies();

    // mutation for removing a movie
    const mutation = useMutation({
        mutationFn: (movieId: string) => removeMovie(movieId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movies-admin'] }); // refresh movie list
            toast.success('Movie removed successfully!');
            setLoadingMovieId(null); // Reset loading state after success
        },
        onError: (error: any) => {
            toast.error(`Error removing movie: ${error.message}`);
            setLoadingMovieId(null); // Reset loading state on error
        },
    });

    if (error) return <div>Error: {(error as Error).message}</div>;

    const onDeleteMovie = useCallback((movieId: string) => {
        setLoadingMovieId(movieId); // Set the loading state for the specific movie
        mutation.mutate(movieId);
    }, [mutation]);

    const renderedMovies = useMemo(() => {
        return movies?.data?.map((movie: Movie) => (
            <MovieCardAdmin
                key={movie._id}
                movie={movie}
                onDelete={onDeleteMovie}
                isLoading={loadingMovieId === movie._id}
            />
        ));
    }, [movies, loadingMovieId, onDeleteMovie]);





    return (
        <div className="mt-8">
            <FilterMoviesAdmin isFiltering={isFiltering} onFilter={handleFilter} />
            <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Latest Movies</h2>
            {isLoading && <div>Loading...</div>}
            {!isFiltering && (
                <div className="flex gap-4 flex-wrap w-full p-4 md:p-2 xl:p-5 justify-start">
                    {movies?.data?.length === 0 && <p> There are no movies available.</p>}
                    {renderedMovies}
                </div>
            )}
        </div>
    );
}