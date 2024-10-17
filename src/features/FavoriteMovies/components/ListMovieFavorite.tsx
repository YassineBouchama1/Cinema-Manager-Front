'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReservations } from '@/features/Profile/apis/getReservations';
import MovieTicket from './MovieTicket'; // Adjust the import path as necessary
import { Reservation } from '../types';

const ListMovieFavorite: React.FC = () => {



    // fetching list of reservations
    const { data, isLoading, error } = useQuery({
        queryKey: ['favorite-profile'],
        queryFn: getReservations,
        enabled: false, // TODO fetch only when cancle reservation
    });



    console.log(data)
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (


        <section className="movie-tickets-list  flex flex-wrap gap-5">
            {data && data?.data?.map((reservation: Reservation) => (
                <MovieTicket key={reservation.reservationId} reservation={reservation} />
            ))}
        </section>

    );
};

export default ListMovieFavorite;