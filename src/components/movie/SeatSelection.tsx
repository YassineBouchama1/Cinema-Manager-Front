'use client'

import React, { useState, useEffect } from 'react';
import { Armchair } from 'lucide-react';

interface SeatSelectionProps {
    totalSeats: number;
    seatsPerRow: number;
    reservedSeats: number[];
    onSelectionChange?: (selectedSeats: number[]) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
    totalSeats,
    seatsPerRow,
    reservedSeats,
    onSelectionChange,
}) => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const handleSeatClick = (seatNumber: number) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatNumber)) {
                return prev.filter((seat) => seat !== seatNumber);
            } else if (prev.length < 2) {
                return [...prev, seatNumber];
            }
            return prev;
        });
    };

    // useEffect(() => {
    //     onSelectionChange(selectedSeats);
    // }, [selectedSeats, onSelectionChange]);

    // render seats
    const renderSeats = () => {
        const seats = [];
        const rows = Math.ceil(totalSeats / seatsPerRow);

        for (let row = 0; row < rows; row++) {
            const rowSeats = [];
            for (let col = 0; col < seatsPerRow; col++) {
                const seatNumber = row * seatsPerRow + col + 1;
                if (seatNumber <= totalSeats) {
                    const isReserved = reservedSeats.includes(seatNumber);
                    const isSelected = selectedSeats.includes(seatNumber);

                    rowSeats.push(
                        <button
                            key={seatNumber}
                            onClick={() => !isReserved && handleSeatClick(seatNumber)}
                            disabled={isReserved}
                            className={`p-1 m-1 rounded-md transition-colors ${isReserved
                                ? 'bg-gray-400 cursor-not-allowed'
                                : isSelected
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            <Armchair size={20} />
                        </button>
                    );
                }
            }
            seats.push(
                <div key={`row-${row}`} className="flex justify-center mb-2">
                    {rowSeats}
                </div>
            );
        }
        return seats;
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Inside Out 2</h2>
            <div className="flex justify-between mb-4">
                <span>Cinema Hall N°3</span>
                <span>Tuesday 23 July</span>
                <span>14:30 - 15:40</span>
            </div>
            <div className="flex space-x-4 mb-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>
                    <span>Available - $12</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
                    <span>VIP seats - $20</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                    <span>Unavailable</span>
                </div>
            </div>

            <div className="mb-8 text-center">
                <div className="w-3/4 h-14 mx-auto rounded-3xl border-t-2 border-gray-300 mb-4">
                    <p className='pt-5'>Screen</p>
                </div>
                {/* render seats */}
                <div className="flex flex-col items-center">
                    {renderSeats()}
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;