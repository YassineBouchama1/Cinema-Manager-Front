'use client';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { Movie } from '@/types/movie';
import { CirclePlay } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useState } from 'react';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { openModel } = useGlobalTheme();
    const [isHovered, setIsHovered] = useState(false);

    const onBuyTickets = () => {
        openModel(movie._id);
    };

    return (
        <Link
            href={`/movie/${movie._id}`}
            // onClick={onBuyTickets}
            className="md:w-52 w-full text-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="rounded-xl w-full h-72 relative overflow-hidden">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.image}`}
                    alt={movie.name}
                    fill
                    className={`rounded-xl transition-all duration-300 ${isHovered ? 'filter blur-sm' : ''}`}
                />
                {isHovered && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">

                        <CirclePlay className=' opacity-70' size={60} />

                    </div>
                )}
            </div>
            <p className="mt-2 mb-4 text-white">{movie.name}</p>
        </Link>
    );
}

export default memo(MovieCard);