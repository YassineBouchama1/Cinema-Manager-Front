import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation } from '../apis/cancelReservation';
import { Reservation } from '../types';

interface MovieTicketProps {
  reservation: Reservation;
}

const MovieTicket: React.FC<MovieTicketProps> = ({ reservation }) => {
  const queryClient = useQueryClient();

  console.log(reservation)

  // mutation for canceling reservation
  const mutation = useMutation<void, Error, string>(cancelReservation, {
    onSuccess: () => {
      // Invalidate and refetch reservations after a successful cancellation
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
      <button onClick={handleCancel} disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Canceling...' : 'Cancel Reservation'}
      </button>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </div>
  );
};

export default MovieTicket;