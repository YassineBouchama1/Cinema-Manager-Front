'use client';
import React from 'react';
import { useFetchShowTimes } from '../hooks/useFetchShowTimes';
import ShowTimeItem from './ShowTimeItem';
import { ShowTimeAdmin } from '@/types/showTime';

const ListShowTimes: React.FC = () => {
    const { showTimes, isLoading, error } = useFetchShowTimes();
    console.log(showTimes)
    if (error) return <div>Error: {(error as Error).message}</div>;
    // if (!showTimes || !showTimes?.data) return <h2>There is no showtiimes</h2>
    return (
        <div className="bg-gray-900 md:w-[60%] w-full relative overflow-x-auto shadow-md sm:rounded-lg  p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Showtime List</h2>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
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
                    <tbody>
                        {showTimes && showTimes?.data.length === 0 && <tr><td colSpan={5} className="text-center">No showtimes available.</td></tr>}
                        {showTimes?.data.map((showTime: ShowTimeAdmin) => (
                            <ShowTimeItem key={showTime._id} showTime={showTime} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListShowTimes;