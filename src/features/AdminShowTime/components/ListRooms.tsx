'use client';
import React from 'react';
import { useFetchRooms } from '../hooks/useFetchRooms';
import RoomItem from './RoomItem';

const ListRooms: React.FC = () => {
    const { rooms, isLoading, error } = useFetchRooms(); // fetch rooms using custom hook

    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="md:w-[60%] w-full relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Room List</h2>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Capacity</th>
                            <th scope="col" className="px-6 py-3">Seats Per Row</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms?.data?.length === 0 && <tr><td colSpan={5} className="text-center">No rooms available.</td></tr>}
                        {rooms?.data?.map((room) => (
                            <RoomItem key={room._id} room={room} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListRooms;