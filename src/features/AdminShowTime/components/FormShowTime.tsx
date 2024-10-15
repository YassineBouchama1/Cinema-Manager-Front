'use client';
import React, { useEffect } from 'react';
import useFormShowTime from '../hooks/useFormShowTime';
import { useShowTimeFormStore } from '../store/showTimeFormStore';
import SelectMovieRoom from './SelectMovieRoom';

const FormShowTime: React.FC = () => {
    const { onSubmit } = useFormShowTime();
    const { isUpdateMode, price, setPrice, startAt, setStartAt } = useShowTimeFormStore();






    return (
        <div className="bg-gray-900 md:w-[40%] w-full mx-auto sm:p-6 text-white">
            <div className="space-y-4">
                <input value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="number"
                    placeholder="Price" className="w-full p-2 bg-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />


                <SelectMovieRoom />

                <input value={startAt}
                    onChange={(e) => setStartAt(e.target.value)} type="datetime-local" className="w-full p-2 bg-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {/* {errors.startAt && <p className="text-red-500">{errors.startAt.message}</p>} */}

                <button
                    onClick={() => onSubmit()}
                    type="button" className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    {isUpdateMode ? "Update Showtime" : "Create Showtime"}
                </button>
            </div>
        </div>
    );
};

export default FormShowTime;