// src/components/MovieCard.tsx

import React from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';

interface MovieCardProps extends Movie { }

const MovieCard: React.FC<MovieCardProps> = ({
    title,
    image,
    language,
    ageRating,
    dimension,
    duration,
    buyTicketsLink
}) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-64">
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
        <div className="p-4">
            <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{language}</span>
                <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{ageRating}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
                <span>{dimension}</span>
                <span>{duration}</span>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Buy Tickets
            </button>
        </div>
    </div>
);

export default MovieCard;