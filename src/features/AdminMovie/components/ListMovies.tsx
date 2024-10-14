'use client'
import { Movie } from '@/types/movie';
import React from 'react'
import { useFetchMovies } from '../hooks/useFetchMovies';

export default function ListMovies() {

    const { movies, isLoading, error, isFiltering, handleFilter } = useFetchMovies();

    if (error) return <div>Error: {(error as Error).message}</div>;


    return (
        <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Recent Additions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies?.data && movies.data?.map((movie: Movie) => (
                    <div key={movie._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.image}`} alt={movie.name} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h4 className="font-semibold text-lg">{movie.name}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
