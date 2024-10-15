'use client';
import React from 'react';
import { useFetchShowTimes } from '../hooks/useFetchShowTimes';
import ShowTimeItem from './ShowTimeItem';

const ListShowTimes: React.FC = () => {
    const { showTimes, isLoading, error } = useFetchShowTimes();

    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="md:w-[60%] w-full relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
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
                        {showTimes?.data?.length === 0 && <tr><td colSpan={5} className="text-center">No showtimes available.</td></tr>}
                        {showTimes?.data?.map((showTime) => (
                            <ShowTimeItem key={showTime._id} showTime={showTime} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListShowTimes;