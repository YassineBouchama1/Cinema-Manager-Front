'use client';
import React, { useMemo } from 'react';
import { useFetchShowTimes } from '../hooks/useFetchShowTimes';
import ShowTimeItem from './ShowTimeItem';
import { ShowTimeAdmin } from '@/types/showTime';

const ListShowTimes: React.FC = () => {
    const { showTimes, isLoading, error } = useFetchShowTimes();

    // memorze the showtimes data for performance
    const showTimeData = useMemo(() => showTimes?.data || [], [showTimes]);

    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="bg-gray-800 md:w-[60%] w-full relative overflow-x-auto shadow-md sm:rounded-lg p-6">

            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Movie</th>
                        <th scope="col" className="px-6 py-3">Room</th>
                        <th scope="col" className="px-6 py-3">Start At</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <tbody>
                        {showTimeData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">No showtimes available.</td>
                            </tr>
                        ) : (
                            showTimeData.map((showTime: ShowTimeAdmin) => (
                                <ShowTimeItem key={showTime._id} showTime={showTime} />
                            ))
                        )}
                    </tbody>
                )}
            </table>

        </div>
    );
};

export default ListShowTimes;