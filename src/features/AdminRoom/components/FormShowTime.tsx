'use client';
import React, { useEffect } from 'react';
import useFormShowTime from '../hooks/useFormShowTime';
import { useShowTimeFormStore } from '../store/showTimeFormStore';
import SelectMovieRoom from './SelectMovieRoom';

const FormShowTime: React.FC = () => {
    const { register, handleSubmit, errors, onSubmit, reset } = useFormShowTime();
    const { currentShowTime, isUpdateMode } = useShowTimeFormStore();

    useEffect(() => {
        if (isUpdateMode && currentShowTime) {
            reset(currentShowTime);
        }
    }, [currentShowTime, isUpdateMode, reset]);


    const handleMovieSelect = (movieId: string) => {

        console.log('Selected Movie ID:', movieId);
    };

    const handleRoomSelect = (roomId: string) => {

        console.log('Selected Room ID:', roomId);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-[40%] w-full mx-auto sm:p-6 text-white">

            <div className="space-y-4">
                <input {...register('price', { valueAsNumber: true })} type="number" placeholder="Price" className="w-full p-2 bg-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}

                <SelectMovieRoom onMovieSelect={handleMovieSelect} onRoomSelect={handleRoomSelect} />

                <input {...register('startAt')} type="datetime-local" className="w-full p-2 bg-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.startAt && <p className="text-red-500">{errors.startAt.message}</p>}

                <button type="submit" className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    {isUpdateMode ? "Update Showtime" : "Create Showtime"}
                </button>
            </div>
        </form>
    );
};

export default FormShowTime;