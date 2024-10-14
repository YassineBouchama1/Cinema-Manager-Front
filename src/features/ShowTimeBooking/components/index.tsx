'use client'
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ShowTimeBooking: React.FC = () => {
    const { currentMovieId } = useGlobalTheme();

    const pathname = usePathname();
    const id = pathname.split('/').pop();

    if (!id) return toast.error('id movie required');
    console.log(id)
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
    } = useShowTimeBooking({ id });

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