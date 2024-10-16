'use client'
import React, { useCallback } from 'react';
import useFormShowTime from '../hooks/useFormShowTime';
import { useShowTimeFormStore } from '../store/showTimeFormStore';
import SelectMovieRoom from './SelectMovieRoom';

const FormShowTime: React.FC = () => {
    const { onSubmit, isLoading } = useFormShowTime();
    const { isUpdateMode, price, setPrice, startAt, setStartAt, errors } = useShowTimeFormStore();

    const handlePriceChange = useCallback((e: any) => setPrice(Number(e.target.value)), [setPrice]);
    const handleStartAtChange = useCallback((e: any) => setStartAt(e.target.value), [setStartAt]);

    return (
        <div className="bg-gray-800 md:w-[40%] w-full mx-auto sm:p-6 text-white">
            <div className="space-y-4">
                <input
                    value={price}
                    onChange={handlePriceChange}
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 bg-gray-900/80 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <span className="error text-red-500">{errors.price}</span>}

                <SelectMovieRoom />

                <input
                    value={startAt}
                    onChange={handleStartAtChange}
                    type="datetime-local"
                    className="w-full p-2 bg-gray-900/80 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.startAt && <span className="error text-red-500">{errors.startAt}</span>}

                <button
                    onClick={onSubmit}
                    type="button"
                    disabled={isLoading}
                    style={{ opacity: isLoading ? 0.4 : 1 }}
                    className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {isUpdateMode ? (isLoading ? "Updating" : "Update Showtime") : (isLoading ? "Creating" : "Create Showtime")}
                </button>
            </div>
        </div>
    );
};

export default FormShowTime;