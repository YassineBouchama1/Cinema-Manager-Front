'use client';
import React from 'react';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import SeatSelection from './SeatSelection';
import TicketSummary from './TicketSummary';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import toast from 'react-hot-toast';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';
import { usePurchase } from '../hooks/usePurchase';
import { useShowTimeBooking } from '../hooks/useShowTimeBooking';
import ShowTimesSkeleton from '@/components/skeletons/ShowTimesSkeleton';
import { usePathname } from 'next/navigation';

const ShowTimeBooking: React.FC = () => {

    const pathname = usePathname();
    const id = pathname.split('/').pop();

    // chekc if id exist
    if (!id) {
        toast.error('Movie ID is required');
        return null; // make it  null to avoid rendering the component
    }

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
    const { handleBuy, loadingPurchase, errorPurchase } = usePurchase(selectedShowTime, selectedSeats, setSelectedSeats);

    if (isLoading) {
        return <ShowTimesSkeleton />;
    }


    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

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