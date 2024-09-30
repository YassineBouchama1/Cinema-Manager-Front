'use client'
import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/types/movie';

interface MoviesCardProps {
    movies: Movie[];
}
const MovieRecommendations: React.FC<MoviesCardProps> = ({ movies }) => {


    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <MovieCard
                title="Inception"
                image="/images/poster.jpg"
                genres={['Action', 'Adventure', 'Sci-Fi']}
                watchingCount={18}
            />
        </div>

    );
}

export default MovieRecommendations;