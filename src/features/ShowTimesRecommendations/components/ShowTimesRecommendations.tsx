'use client';
import React, { memo } from 'react';
import FilterMovie from './FilterShowTime';
import { Movie } from '@/types/movie';
import { useShowTimesRecommendations } from '../hooks/useShowTimesRecommendations';
import ShowTimeCard from './showTimeCard';
import { MovieHasShowTimes } from '@/types/showTime';

const ShowTimesRecommendations: React.FC = () => {
    const { showTimes, isLoading, error, isFiltering, handleFilter } = useShowTimesRecommendations();

    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="text-white pt-6 h-full">

            <FilterMovie onFilter={handleFilter} isFiltering={isFiltering} />

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Coming Soon</h2>

                {/* Loading while fetching */}
                {isFiltering && (
                    <div className="flex gap-4 flex-wrap w-full p-4 md:p-2 xl:p-5 justify-start">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <button key={i} className="md:w-60 w-full text-center animate-pulse">
                                <div className="rounded-xl w-full h-96 relative overflow-hidden bg-gray-800"></div>
                                <div className="mt-2 mb-4 h-4 bg-gray-800 rounded w-3/4"></div>
                            </button>
                        ))}
                    </div>
                )}

                {!isFiltering && (
                    <div className="flex gap-4 flex-wrap w-full p-4 md:p-2 xl:p-5 justify-start">
                        {!showTimes?.data && <p>There are no showtimes</p>}
                        {showTimes?.data && showTimes?.data.map((showTime: MovieHasShowTimes) => (
                            <ShowTimeCard key={showTime._id} showTime={showTime} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ShowTimesRecommendations);