'use client';
import React from 'react';
import { ShowTimeAdmin } from '@/types/showTime';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeShowTime } from '../apis/removeShowTime';
import { Lock, Edit, Trash } from 'lucide-react';
import { useShowTimeFormStore } from '../store/showTimeFormStore';

interface ShowTimeItemProps {
    showTime: ShowTimeAdmin;
}

const ShowTimeItem: React.FC<ShowTimeItemProps> = ({ showTime }) => {
    const queryClient = useQueryClient();


    const { setUpdateMode, setMovieId, setRoomId, setPrice, setIdShowTime } = useShowTimeFormStore()
    const mutation = useMutation({
        mutationFn: (showTimeId: string) => removeShowTime(showTimeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['showtimes-admin'] });
            toast.success('Showtime removed successfully!');
        },
        onError: (error: any) => {
            toast.error(`Error removing showtime: ${error.message}`);
        },
    });

    const onDeleteShowTime = () => {
        mutation.mutate(showTime._id);
    };


    const onUpdateRoom = () => {

        setPrice(showTime.price)
        setIdShowTime(showTime._id)
        typeof showTime.roomId !== 'string' && setRoomId(showTime.roomId._id)
        typeof showTime.movieId !== 'string' && setMovieId(showTime.movieId._id)

        //  console.log
        setUpdateMode(true); // switch to update mode
    };


    return (
        <tr className="border-t border-gray-700">
            <td className="py-2 px-4">{showTime.price}</td>
            <td className="py-2 px-4">
                {typeof showTime.movieId !== 'string' && (
                    <div className="flex items-center">
                        <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${showTime.movieId.image}`}
                            alt={showTime.movieId.name || 'Movie Image'}
                            className="w-10 h-10 rounded-full mr-2"
                        />
                        <div>
                            <div>{showTime.movieId.name}</div>
                        </div>
                    </div>
                )}
            </td>
            <td className="py-2 px-4">{typeof showTime.roomId !== 'string' && showTime.roomId.name}</td>
            <td className="py-2 px-4">{new Date(showTime.startAt).toLocaleString()}</td>
            <td className="py-2 px-4">
                <div className="flex space-x-2">
                    <Lock size={16} className="cursor-pointer" />
                    <Edit size={16} className="cursor-pointer" onClick={onUpdateRoom} />
                    <Trash size={16} className="cursor-pointer" onClick={onDeleteShowTime} />
                </div>
            </td>
        </tr>
    );
};

export default ShowTimeItem;