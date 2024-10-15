'use client';
import React from 'react';
import {  ShowTimeAdmin } from '@/types/showTime';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeShowTime } from '../apis/removeShowTime';

interface ShowTimeItemProps {
    showTime: ShowTimeAdmin;
}

const ShowTimeItem: React.FC<ShowTimeItemProps> = ({ showTime }) => {
    const queryClient = useQueryClient();

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

    return (
        <tr className="odd:bg-gray-900 dark:bg-gray-800 border-b border-gray-700">
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white">{showTime.price}</td>
            <td className="px-6 py-4">{showTime.movieId}</td>
            <td className="px-6 py-4">{showTime.roomId}</td>
            <td className="px-6 py-4">{new Date(showTime.startAt).toLocaleString()}</td>
            <td className="px-6 py-4">
                <button onClick={onDeleteShowTime} className="font-medium text-red-400 hover:underline ml-2" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
            </td>
        </tr>
    );
};

export default ShowTimeItem;