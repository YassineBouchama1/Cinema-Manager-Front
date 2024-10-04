import React, { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reservation } from '../types';
import { cancelReservation } from '../apis/cancelReservation';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { useRouter } from 'next/navigation';

interface MovieTicketProps {
  reservation: Reservation;
}

const MovieTicket: React.FC<MovieTicketProps> = ({ reservation }) => {
  const queryClient = useQueryClient();
  const router = useRouter();


  // this  for mutation for cancel reservation
  const mutation = useMutation({
    mutationFn: (reservationId: string) => cancelReservation(reservationId),
    onSuccess: () => {
      // refresh the page
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['reservation-profile'] });
    },
    onError: (error: Error) => {
      console.error('Error canceling reservation:', error.message);
    },
  });

  const handleCancel = () => {
    mutation.mutate(reservation.reservationId);
  };


  //TODO ths can scan by app or website to check if rservation valid
  const qrCodeValue = `${process.env.NEXT_PUBLIC_URL_FRONT}/admin/checker/${reservation.reservationId}`;


  // thsi for Refactore start date 
  const dateInfo = useMemo(() => {
    const date = new Date(reservation.showTime.startAt);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'long' }),
      time: date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })
    };
  }, [reservation.showTime.startAt]);



  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-[400px] m-4">
      <div className="p-4 flex gap-x-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${reservation.showTime.movie.image}`}
          alt={reservation.showTime.movie.name}
          width={200}
          height={300}
          className="w-2/4 h-auto object-cover rounded"
        />
        <div className='flex flex-col justify-between'>
          <h2 className="text-xl font-bold mt-2">{reservation.showTime.movie.name}</h2>
          <p className="text-gray-200">{`Date: ${dateInfo.day} ${dateInfo.month}`}</p>
          <p className="text-gray-200">{`Time: ${dateInfo.time}`}</p>
          <p className="text-gray-200">Room: {reservation.showTime.room.name}</p>
          <p className="text-gray-200">Seat: {reservation.seats.join(', ')}</p>
          <p className="text-gray-200">Total: ${reservation.totalPrice}</p>
          <p className="text-gray-200">Status: {reservation.status}</p>
          <div className="bg-gray-100 p-4">
            <QRCodeSVG value={qrCodeValue} size={128} />
          </div>
        </div>

      </div>
      <button
        onClick={handleCancel}
        disabled={mutation.isPending || reservation.status === 'cancel'}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400 w-full"
      >

        {reservation.status === 'cancel' ? 'canceled' : (mutation.isPending ? 'Canceling...' : 'Cancel Reservation')}
      </button>
      {mutation.isError && <p className="text-red-500 mt-2">Error: {mutation.error.message}</p>}

    </div>
  );
};

export default MovieTicket;