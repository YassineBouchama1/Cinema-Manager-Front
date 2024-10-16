import React, { useCallback } from 'react';
import { Lock, Edit, Loader, Unlock } from 'lucide-react';
import { useReservationMutation } from '../hooks/useReservationMutation';
import { IReservationAdmin } from '@/types/reservation';
import Image from 'next/image';

interface ReservationItemProps {
    reservation: IReservationAdmin;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ reservation }) => {
    const mutation = useReservationMutation(reservation._id);

    const onUpdateStatusReservation = useCallback(() => {

        mutation.mutate();
    }, [mutation]);

    return (
        <tr className="border-t my-3 bg-gray-900 rounded-md border-gray-700">
            <td className="py-2 px-4">{reservation.userId.name}</td>
            <td className="py-2 px-4">
                <div className="flex items-center">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${reservation.showTimeId.movieId.image}`}
                        alt={reservation.showTimeId.movieId.name || 'Movie Image'}
                        className="w-10 h-10 rounded-full mr-2"
                        width={'40'}
                        height={'40'}
                    />
                    <div>{reservation.showTimeId.movieId.name}</div>
                </div>
            </td>
            <td className="py-2 px-4">{reservation.seats.join(',')}</td>
            <td className="py-2 px-4">{reservation.totalPrice}</td>
            <td className="py-2 px-4" style={{ color: reservation.status === 'active' ? 'green' : 'red' }}>
                {reservation.status}
            </td>
            <td className="py-2 px-4">
                <div className="flex space-x-2">
                    <button
                        className="cursor-pointer"
                        onClick={onUpdateStatusReservation}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? (
                            <Loader size={16} className="animate-spin" />
                        ) : (
                            reservation.status === 'active' ? <Lock size={16} className='text-red-700' /> : <Unlock size={16} className='text-green-700' />
                        )}
                    </button>
                    <button className="cursor-pointer" onClick={() => console.log('Edit user')}>
                        <Edit size={16} className='text-blue-700' />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default React.memo(ReservationItem);