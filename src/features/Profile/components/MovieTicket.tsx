import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';// Adjust the import path as necessary
import { Reservation } from '../types';
import { cancelReservation } from '../apis/cancelReservation';

interface MovieTicketProps {
  reservation: Reservation;
}

const MovieTicket: React.FC<MovieTicketProps> = ({ reservation }) => {
  const queryClient = useQueryClient();


  //  mutation for cancel reservation
  const mutation = useMutation({
    mutationFn: (reservationId: string) => cancelReservation(reservationId),
    onSuccess: () => {
      // refetch reservations after a successful cancellation
      queryClient.invalidateQueries({ queryKey: ['reservation-profile'] });
    },
    onError: (error: Error) => {
      console.error('Error canceling reservation:', error.message);
    },
  });

  const handleCancel = () => {
    mutation.mutate(reservation.reservationId);
  };

  return (
    <div className="movie-ticket">
      <h2>{reservation.showTime.movie.name}</h2>
      <p>Room: {reservation.showTime.room.name}</p>
      <p>Seats: {reservation.seats.join(', ')}</p>
      <p>Total Price: ${reservation.totalPrice}</p>
      <p>Status: {reservation.status}</p>
      <button onClick={handleCancel} disabled={mutation.isPending}>
        {mutation.isPending ? 'Canceling...' : 'Cancel Reservation'}
      </button>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </div>
  );
};

export default MovieTicket;