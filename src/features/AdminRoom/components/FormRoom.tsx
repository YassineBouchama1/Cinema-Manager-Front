'use client';
import React, { useEffect } from 'react';
import useFormRoom from '../hooks/useFormRoom';
import { useRoomFormStore } from '../store/roomFormStore';

const FormRoom: React.FC = () => {
    const { register, handleSubmit, errors, onSubmit, reset } = useFormRoom();
    const { currentRoom, isUpdateMode } = useRoomFormStore();

    useEffect(() => {
        if (isUpdateMode && currentRoom) {
            reset(currentRoom);
        }
    }, [currentRoom, isUpdateMode, reset]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 md:w-[40%] w-full mx-auto sm:p-6 text-white">
            <div className="space-y-4">
                <input {...register('name')} placeholder="Room Name" className="w-full p-2 bg-gray-900/80 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <input {...register('capacity', { valueAsNumber: true })} type="number" placeholder="Capacity" className="w-full p-2 bg-gray-900/80 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900" />
                {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}

                <input {...register('seatsPerRow', { valueAsNumber: true })} type="number" placeholder="Seats Per Row" className="w-full p-2 bg-gray-900/80 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900" />
                {errors.seatsPerRow && <p className="text-red-500">{errors.seatsPerRow.message}</p>}

                <input {...register('type')} placeholder="Room Type (e.g., VIP)" className="w-full p-2 bg-gray-900/80 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900" />
                {errors.type && <p className="text-red-500">{errors.type.message}</p>}

                <button type="submit" className="mt-6 w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2">
                    {isUpdateMode ? "Update Room" : "Create Room"}
                </button>
            </div>
        </form>
    );
};

export default FormRoom;