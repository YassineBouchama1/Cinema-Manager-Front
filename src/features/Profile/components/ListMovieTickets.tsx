'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReservations } from '@/features/Profile/apis/getReservations';
import MovieTicket from './MovieTicket';
import { Reservation } from '../types';
import MovieTicketSkeleton from '@/components/skeletons/MovieTicketSkeleton';

const ListMovieTickets: React.FC = () => {



    // fetching list of reservations
    const { data, isLoading, error } = useQuery({
        queryKey: ['reservation-profile'],
        queryFn: getReservations,
        enabled: false, // TODO fetch only when cancle reservation
    });



    if (isLoading) {
        return <MovieTicketSkeleton />
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

export default ListMovieTickets;