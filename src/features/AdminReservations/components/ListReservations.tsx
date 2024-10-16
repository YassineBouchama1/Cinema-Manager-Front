'use client';
import React, { useMemo } from 'react';
import { useFetchReservations } from '../hooks/useFetchReservations';
import ReservationItem from './ReservationItem';

const ListReservations: React.FC = () => {
    const { reservations, isLoading, error } = useFetchReservations();

    // Ensure reservationsData is always an array
    const reservationsData = reservations?.data || [];

    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg p-6">
            <table className="bg-gray-800 w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs uppercase text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">User Name</th>
                        <th scope="col" className="px-6 py-3">Movie</th>
                        <th scope="col" className="px-6 py-3">Seats</th>
                        <th scope="col" className="px-6 py-3">Total Price</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className="text-center">Loading...</td>
                        </tr>
                    ) : (
                        reservationsData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center">No reservations available.</td>
                            </tr>
                        ) : (
                            reservationsData.map((reservation) => (
                                <ReservationItem key={reservation._id} reservation={reservation} />
                            ))
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListReservations;