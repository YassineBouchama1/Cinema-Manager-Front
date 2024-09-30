'use client'
import React, { useState } from 'react';

import { ShowTime } from '@/types/showTime';
import ShowTimeCard from './ShowTimeCard';
import FilterShowTime from './FilterShowTime';

interface MoviesCardProps {
    showTime: ShowTime[];
}
const ShowTimeRecommendations: React.FC<MoviesCardProps> = ({ showTime }) => {


    return (
        <div className=" text-white min-h-screen p-6">
            <FilterShowTime />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {showTime.map((showtime, index) => (
                    <ShowTimeCard key={index} {...showtime} />
                ))}
            </div>
        </div>

    );
}

export default ShowTimeRecommendations;