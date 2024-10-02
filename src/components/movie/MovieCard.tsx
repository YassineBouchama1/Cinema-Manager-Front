'use client';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { Movie } from '@/types/movie';
import Image from 'next/image';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { isModelOpen, toggleModel } = useGlobalTheme();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const updateURL = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        const currentMovieId = params.get('movieId');

        // check if movieId is already in the URL
        if (currentMovieId !== movie._id) {
            params.set('movieId', movie._id);
            router.push(`${pathname}?${params.toString()}`);
        }
    }, [movie._id, searchParams, pathname, router]);

    const onBuyTickets = () => {
        updateURL();
        toggleModel(movie._id); // passed movie id to display modal
    };




    useEffect(() => {
        // close modal and remove movieId from URL if modal is closed
        if (!isModelOpen && searchParams.get('movieId') === movie._id) {
            const params = new URLSearchParams(searchParams);
            params.delete('movieId');
            router.push(`${pathname}?${params.toString()}`);
        }
    }, [isModelOpen, searchParams, movie._id, router, pathname]);

    return (
        <button onClick={onBuyTickets} key={movie._id} className="md:w-60 w-full text-center">
            <div className="rounded-xl w-full h-96 relative overflow-hidden">

                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.image}`}
                    alt={movie.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"

                />
            </div>
            <p className="mt-2 mb-4 text-white">{movie.name}</p>
        </button>
    );
}

export default MovieCard;
