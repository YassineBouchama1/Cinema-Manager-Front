'use client';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { Movie } from '@/types/movie';
import Image from 'next/image';
import React, { memo } from 'react';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { openModel } = useGlobalTheme();

    const onBuyTickets = () => {
        openModel(movie._id);
    };

    return (
        <button onClick={onBuyTickets} className="md:w-60 w-full text-center">
            <div className="rounded-xl w-full h-96 relative overflow-hidden">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.image}`}
                    alt={movie.name}
                    fill
                    className="rounded-xl"
                />
            </div>
            <p className="mt-2 mb-4 text-white">{movie.name}</p>
        </button>
    );
}

export default memo(MovieCard);