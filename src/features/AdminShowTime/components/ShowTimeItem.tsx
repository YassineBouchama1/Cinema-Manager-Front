'use client';
import React, { useCallback } from 'react';
import { ShowTimeAdmin } from '@/types/showTime';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeShowTime } from '../apis/removeShowTime';
import { Edit, Trash, Loader } from 'lucide-react';
import { useShowTimeFormStore } from '../store/showTimeFormStore';
import Image from 'next/image';

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
        onError: (error: { message: string }) => {
            toast.error(`Error removing showtime: ${error.message}`);
        },
    });

    const onDeleteShowTime = useCallback(() => {
        mutation.mutate(showTime._id);
    }, [mutation, showTime._id]);


    const onUpdateRoom = useCallback(() => {
        setPrice(showTime.price);
        setIdShowTime(showTime._id);
        if (typeof showTime.roomId !== 'string') {
            setRoomId(showTime.roomId._id);
        }
        if (typeof showTime.movieId !== 'string') {
            setMovieId(showTime.movieId._id);
        }
        setUpdateMode(true);
    }, [showTime, setPrice, setIdShowTime, setRoomId, setMovieId, setUpdateMode]);



    return (
        <tr className="border-t border-gray-700">
            <td className="py-2 px-4">{showTime.price}</td>
            <td className="py-2 px-4">
                {typeof showTime.movieId !== 'string' && (
                    <div className="flex items-center">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${showTime.movieId.image}`}
                            alt={showTime.movieId.name || 'Movie Image'}
                            className="w-10 h-10 rounded-full mr-2"
                            height={'40'}
                            width={'40'}
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

                    <button
                        className="cursor-pointer"
                        onClick={onUpdateRoom}
                    >
                        <Edit size={16} className='text-green-700' />
                    </button>
                    <button
                        className="cursor-pointer"
                        onClick={onDeleteShowTime}
                        disabled={mutation.isPending}
                        style={{ opacity: mutation.isPending ? 0.4 : 1 }}
                    >
                        {mutation.isPending ? <Loader size={16} /> : <Trash size={16} className='text-red-700' />}
                    </button>

                </div>
            </td>
        </tr>
    );
};

export default React.memo(ShowTimeItem);