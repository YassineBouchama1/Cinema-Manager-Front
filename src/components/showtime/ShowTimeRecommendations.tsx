'use client'
import React, { useState } from 'react';

import { Movie, ShowTime } from '@/types/showTime';
import ShowTimeCard from './ShowTimeCard';
import FilterShowTime from './FilterShowTime';

interface ShowTimeRecommendationsProps {
    movies: Movie[];
}
const ShowTimeRecommendations: React.FC<ShowTimeRecommendationsProps> = ({ movies }) => {
    const onBuyTickets = (id: string) => {

        console.log(id)
    }

    return (
        <div className=" text-white min-h-screen ">
            <FilterShowTime />
            <div className=" ">
                <h2 className=" text-2xl font-bold mb-4 text-gray-400 ">You may also like</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4 flex-wrap w-full">
                    {movies.map((movie, index) => (
                        <ShowTimeCard key={movie.id} movie={movie} onBuyTickets={onBuyTickets} />
                    ))}
                </div>
            </div>
        </div>

    );
}

export default ShowTimeRecommendations;