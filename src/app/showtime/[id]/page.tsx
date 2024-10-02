'use client'
import SeatSelection from '@/components/movieBooking/SeatSelection';
import React from 'react';



const showTimePage: React.FC = () => {
    const handleSelectionChange = (selectedSeats: number[]) => {
        console.log('Selected seats:', selectedSeats);

    };
    return (
        <div className="container mx-auto p-4">
            <SeatSelection
                totalSeats={50}
                seatsPerRow={5}
                reservedSeats={[1, 2, 15, 16, 30, 31]}
                onSelectionChange={handleSelectionChange}
            />
        </div>
    );
};

export default showTimePage;