'use client';
import React from 'react';
import { Room } from '@/types/room';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeRoom } from '../apis/removeRoom';
import { useRoomFormStore } from '../store/roomFormStore';
import { Lock, Edit, Trash } from 'lucide-react';

interface RoomItemProps {
    room: Room;
}

const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
    const queryClient = useQueryClient();
    const { setCurrentRoom, setUpdateMode } = useRoomFormStore();

    // Mutation for removing a room
    const mutation = useMutation({
        mutationFn: (roomId: string) => removeRoom(roomId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rooms-admin'] });
            toast.success('Room removed successfully!');
        },
        onError: (error: any) => {
            toast.error(`Error removing room: ${error.message}`);
        },
    });

    const onDeleteRoom = () => {
        mutation.mutate(room._id);
    };

    const onUpdateRoom = () => {
        setCurrentRoom(room);
        setUpdateMode(true);
    };

    return (
        <tr className="border-t border-gray-7000">
            <td className="py-2 px-4">{room.name}</td>
            <td className="py-2 px-4">{room.capacity}</td>
            <td className="py-2 px-4">{room.seatsPerRow}</td>
            <td className="py-2 px-4">{room.type}</td>
            <td className="py-2 px-4">
                <div className="flex space-x-2">
                    <Lock size={16} className="cursor-pointer" onClick={onUpdateRoom} />
                    <Edit size={16} className="cursor-pointer" onClick={onUpdateRoom} />
                    <Trash size={16} className="cursor-pointer" onClick={onDeleteRoom} />
                </div>
            </td>
        </tr>
    );
};

export default RoomItem;