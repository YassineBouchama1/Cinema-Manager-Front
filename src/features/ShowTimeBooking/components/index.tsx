'use client';
import React from 'react';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import SeatSelection from './SeatSelection';
import TicketSummary from './TicketSummary';
import toast from 'react-hot-toast';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';
import { usePurchase } from '../hooks/usePurchase';
import { useShowTimeBooking } from '../hooks/useShowTimeBooking';
import ShowTimesSkeleton from '@/components/skeletons/ShowTimesSkeleton';
import { usePathname } from 'next/navigation';

const ShowTimeBooking: React.FC = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    // Check if id exists
    if (!id) {
        toast.error('Movie ID is required');
        return null; // Return null to avoid rendering the component
    }

    // Call hooks unconditionally
    const {
        showTimes,
        isLoading,
        error,
        selectedDate,
        selectedTime,
        selectedSeats,
        selectedShowTime,
        roomCapacity,
        reservedSeats,
        uniqueDates,
        showTimesForSelectedDate,
        totalPrice,
        handleDateSelect,
        handleTimeSelect,
        handleSeatSelection,
        setSelectedSeats
    } = useShowTimeBooking({ currentMovieId: id });

    // Call usePurchase after useShowTimeBooking
    const { handleBuy, loadingPurchase } = usePurchase(selectedShowTime, selectedSeats, setSelectedSeats);

    // Handle loading state
    if (isLoading) {
        return <ShowTimesSkeleton />;
    }

    // Handle error state
    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

    // Handle no showtimes available
    if (!showTimes || showTimes.length === 0) {
        return <div>No showtimes available</div>;
    }

    return (
        <MarginWidthWrapper>
            <DateSelector
                uniqueDates={uniqueDates}
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
            />

            {selectedDate && (
                <TimeSelector
                    times={showTimesForSelectedDate}
                    selectedTime={selectedTime}
                    onSelect={handleTimeSelect}
                />
            )}

            {selectedShowTime && (
                <SeatSelection
                    roomCapacity={roomCapacity}
                    reservedSeats={reservedSeats}
                    selectedSeats={selectedSeats}
                    onSeatSelect={handleSeatSelection}
                    seatsPerRow={10}
                />
            )}

            {selectedShowTime && (
                <TicketSummary
                    selectedSeatsCount={selectedSeats.length}
                    totalPrice={totalPrice}
                    onBuy={handleBuy}
                    showTimeId={selectedShowTime?._id || ''}
                    loading={loadingPurchase}
                />
            )}
        </MarginWidthWrapper>
    );
};

export default ShowTimeBooking;