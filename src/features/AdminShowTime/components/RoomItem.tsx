'use client';
import React from 'react';
import { Room } from '@/types/room';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeRoom } from '../apis/removeRoom';
import { useRoomFormStore } from '../store/roomFormStore';

interface RoomItemProps {
    room: Room;
}

const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
    const queryClient = useQueryClient();
    const { setCurrentRoom, setUpdateMode } = useRoomFormStore(); // get funcs from and store room

    // this mutation for removing  room
    const mutation = useMutation({
        mutationFn: (roomId: string) => removeRoom(roomId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rooms-admin'] }); // refresh room list after remove
            toast.success('Room removed successfully!');
        },
        onError: (error: any) => {
            toast.error(`Error removing room: ${error.message}`);
        },
    });

    const onDeleteRoom = () => {
        mutation.mutate(room._id); // call mutation and pass id rooom
    };

    const onUpdateRoom = () => {
        setCurrentRoom(room); // set the current room in the store : room wnat update
        setUpdateMode(true); // switch to update mode
    };

    return (
        <tr className=" odd:bg-gray-900 dark:bg-gray-800 border-b border-gray-700">
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white">{room.name}</td>
            <td className="px-6 py-4">{room.capacity}</td>
            <td className="px-6 py-4">{room.seatsPerRow}</td>
            <td className="px-6 py-4">{room.type}</td>
            <td className="px-6 py-4">
                <button onClick={onUpdateRoom} className="font-medium text-[#4880FF] hover:underline">Update</button>
                <button onClick={onDeleteRoom} className="font-medium text-red-400 hover:underline ml-2" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
            </td>
        </tr>
    );
};

export default RoomItem;