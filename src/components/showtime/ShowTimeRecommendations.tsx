'use client'
import React, { useState } from 'react';

import { Movie, ShowTime } from '@/types/showTime';
import ShowTimeCard from './ShowTimeCard';
import FilterShowTime from './FilterShowTime';
import Modal from '../commen/Modal';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import DragCloseDrawer from '../commen/DragCloseDrawer';
import MovieCardSkeleton from '../skeletons/MovieSkeleton';

interface ShowTimeRecommendationsProps {
    movies: Movie[];
}
const ShowTimeRecommendations: React.FC<ShowTimeRecommendationsProps> = ({ movies }) => {


    const { isModelOpen, toggleModel } = useGlobalTheme();

    return (
        <div className=" text-white min-h-screen  border-t-2 pt-10">
            <FilterShowTime />
            <div className="">
                <h2 className=" text-2xl font-bold mb-4 text-gray-400 ">You may also like</h2>
                <div className="group flex space-x-4 overflow-x-auto pb-4 flex-wrap w-full">
                    {movies.map((movie) => (
                        <ShowTimeCard key={movie.id} movie={movie}  />
                    ))}


                </div>
            </div>

            <DragCloseDrawer isOpen={isModelOpen} onClose={toggleModel}><h2>jhbjhbjhb</h2></DragCloseDrawer>
            {/* <Modal isOpen={isModelOpen} onClose={toggleModel}><h2>jhbjhbjhb</h2></Modal> */}
        </div>

    );
}

export default ShowTimeRecommendations;