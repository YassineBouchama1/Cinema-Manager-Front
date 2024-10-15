import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Room } from '@/types/room';
import { useRoomFormStore } from '../store/roomFormStore';
import { updateRoom } from '../apis/updateRoom';
import { createRoom } from '../apis/createRoom';
import { RoomSchema } from '../validators';

const useFormRoom = () => {
    const { currentRoom, isUpdateMode, resetForm } = useRoomFormStore();



    const { register, handleSubmit, reset, formState: { errors } } = useForm<Room>({
        resolver: zodResolver(RoomSchema),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: Room) => {
            if (isUpdateMode && currentRoom) {
                return await updateRoom(data, currentRoom._id);
            } else {
                return await createRoom(data);
            }
        },
        onSuccess: (data) => {
            toast.success(data.message || (isUpdateMode ? 'Room updated successfully!' : 'Room created successfully!'));
            queryClient.invalidateQueries({ queryKey: ['rooms-admin'] }); // Refresh room list
            reset(); // reset the form fields
            resetForm()
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit: SubmitHandler<Room> = (data) => {
        mutation.mutate(data);
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        reset,
    };
};

export default useFormRoom;