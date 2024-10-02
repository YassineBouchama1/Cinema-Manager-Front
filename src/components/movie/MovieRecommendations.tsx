'use client';
import React from 'react';

import FilterMovie from './FilterMovie';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import DragCloseDrawer from '../commen/DragCloseDrawer';
import MovieCard from './MovieCard';
import { Movie } from '@/types/movie';
import Pagnation from './Pagnation';
import MovieBooking from './MovieBooking';
import { useTheme } from 'next-themes';

interface MovieRecommendationsProps {
    movies: Movie[];
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({ movies }) => {

    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };


    const { isModelOpen, toggleModel } = useGlobalTheme();

    return (
        <div className="text-white  pt-6 h-full">

            {/* Movie Filter */}
            <FilterMovie />

            {/* Movies Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Coming Soon</h2>

                {/* Movie Grid - Responsive Layout */}
                <div className="flex gap-4  flex-wrap w-full p-4 md:p-2 xl:p-5 justify-center">
                    {movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
                <Pagnation />

            </div>

            {/* Drag Close Drawer for Modal */}
            <DragCloseDrawer isOpen={!!isModelOpen} onClose={toggleModel}>
                <MovieBooking />
            </DragCloseDrawer>
        </div>
    );
};

export default MovieRecommendations;
