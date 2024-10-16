'use client';
import React from 'react';
import Image from 'next/image';
import { Loader, OctagonX } from 'lucide-react';
import { Movie } from '@/types/movie';

interface MovieCardAdminProps {
    movie: Movie;
    onDelete: (movieId: string) => void;
    isLoading: boolean;
}

const MovieCardAdmin: React.FC<MovieCardAdminProps> = React.memo(({ movie, onDelete, isLoading }) => {
    return (
        <div className="md:w-52 w-full text-center relative">
            <div className="rounded-xl w-full h-72 relative overflow-hidden">
                <button
                    onClick={() => onDelete(movie._id)}
                    className="absolute top-0 right-0 z-50 cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader className='animate-spin' />
                    ) : (
                        <OctagonX className='text-red-500 hover:text-red-700' />
                    )}
                </button>
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.image}`}
                    alt={movie.name}
                    fill
                    priority
                    className={`rounded-xl transition-all duration-300`}
                />
            </div>
            <p className="mt-2 mb-4 text-white">{movie.name}</p>
            <button
                onClick={() => console.log('Edit movie')}
                className="mt-2 w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
                Update
            </button>
        </div>
    );
});

// assigning display name to the component
MovieCardAdmin.displayName = 'MovieCardAdmin';

export default React.memo(MovieCardAdmin);