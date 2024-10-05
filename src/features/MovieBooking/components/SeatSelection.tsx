import React from 'react';

interface SeatSelectionProps {
    roomCapacity: number;
    reservedSeats: number[];
    selectedSeats: number[];
    onSeatSelect: (seatIndex: number) => void;
    seatsPerRow: number
}

const SeatSelection: React.FC<SeatSelectionProps> = React.memo(({ roomCapacity, reservedSeats, selectedSeats, onSeatSelect, seatsPerRow = 10 }) => {


    console.log(roomCapacity)
    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Select Seats</h2>

            <div className='flex flex-col items-center'>

                <div className="mb-4">

                    <div className="flex space-x-4">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-500 mr-2"></div>
                            <span className="text-white">N/A</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                            <span className="text-white">Selected</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 mr-2"></div>
                            <span className="text-white">Occupied</span>
                        </div>
                    </div>
                </div>

                <div className='perspective-800 w-full flex justify-center mb-10'>
                    <div className=" bg-white h-28 w-[80%] my-4 transform -rotate-x-45 shadow-lg shadow-white flex justify-center items-center "><p className='text-gray-900'>Screen</p></div>
                </div>

            </div>


            <div className={`grid grid-cols-${seatsPerRow} gap-2 w-full mx-auto justify-center `}>
                {Array.from({ length: roomCapacity }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`w-6 h-6 md:w-10 md:h-10 rounded-t-2xl ${reservedSeats.includes(index + 1)
                            ? 'bg-red-500 cursor-not-allowed '
                            : selectedSeats.includes(index + 1)
                                ? 'bg-green-500'
                                : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                        onClick={() => !reservedSeats.includes(index + 1) && onSeatSelect(index + 1)}
                        disabled={reservedSeats.includes(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <p className="mt-4">Selected Seats: {selectedSeats.join(', ')}</p>
        </div >
    );
});

export default SeatSelection;