import React from 'react';

interface SeatSelectionProps {
    roomCapacity: number;
    reservedSeats: number[];
    selectedSeats: number[];
    onSeatSelect: (seatIndex: number) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = React.memo(({ roomCapacity, reservedSeats, selectedSeats, onSeatSelect }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Select Seats</h2>
            <div className="grid grid-cols-10 gap-2">
                {Array.from({ length: roomCapacity }, (_, index) => (
                    <button
                        key={index}
                        className={`w-10 h-10 rounded-lg ${
                            reservedSeats.includes(index)
                                ? 'bg-red-500 cursor-not-allowed'
                                : selectedSeats.includes(index)
                                ? 'bg-green-500'
                                : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        onClick={() => !reservedSeats.includes(index) && onSeatSelect(index)}
                        disabled={reservedSeats.includes(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <p className="mt-4">Selected Seats: {selectedSeats.join(', ')}</p>
        </div>
    );
});

export default SeatSelection;
