'use client';
import { Movie } from '@/types/movie';
import { Bookmark, BookmarkCheck, CirclePlay, Loader, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useState } from 'react';
import useFavoriteMovie from '../hooks/useFavoriteMovie';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { handleFavorite, isLoading } = useFavoriteMovie();

    
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        handleFavorite(movie._id, movie.isFavorite); 
    };

    return (
        <Link
            href={`/movie/${movie._id}`}
            className="md:w-52 w-full text-center relative z-0"
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
                    <>
                        <div className="absolute top-4 left-2 flex flex-col items-center justify-center bg-gray-800 p-1 rounded-xl z-40">
                            {isLoading ? (
                                <Loader size={20} className='animate-spin' />
                            ) : movie.isFavorite ? (
                                <BookmarkCheck
                                    onClick={handleFavoriteClick}
                                    size={20}
                                    className='text-red-800 hover:text-yellow-600 duration-300 z-30'
                                />
                            ) : (
                                <Bookmark
                                    onClick={handleFavoriteClick}
                                    className='text-red-500 hover:text-yellow-600 duration-300 z-30'
                                    size={20}
                                />
                            )}
                        </div>
                        <div className="absolute top-4 right-2 flex flex-row items-center justify-center bg-gray-900 p-1 rounded-xl">
                            <Star className='text-red-500 z-30 hover:text-yellow-600' size={16} />
                            <p className='font-semibold'>{movie.rating}.0</p>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                            <CirclePlay className='opacity-70 hover:text-red-700' size={55} />
                        </div>
                    </>
                )}
            </div>
            <p className="mt-2 mb-4 text-white">{movie.name}</p>
        </Link>
    );
}

export default memo(MovieCard);