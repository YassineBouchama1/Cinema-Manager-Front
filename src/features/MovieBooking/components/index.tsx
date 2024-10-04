'use client'
import React from 'react';
import MovieInfo from './MovieInfo';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import SeatSelection from './SeatSelection';
import TicketSummary from './TicketSummary';

import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { useAuthFormContext } from '@/context/AuthFormContext';
import { useAuthContext } from '@/Providers/AuthProvider';
import toast from 'react-hot-toast';
import { usePurchase } from '../hooks/usePurchase';
import { useMovieData } from '../hooks/useMovieData';
import { useTimeSelection } from '../hooks/useTimeSelection';
import { useDateSelection } from '../hooks/useDateSelection';
import { useSeatSelection } from '../hooks/useSeatSelection';
import { format } from 'date-fns';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';

const MovieBooking: React.FC = () => {
    const { isModelOpen, currentMovieId } = useGlobalTheme();


    if (!currentMovieId) return toast.error('id movie required')

    const { data: movieData, isLoading, error } = useMovieData({ currentMovieId });
    const { selectedDate, selectedShowTime, uniqueDates, handleDateSelect, getShowTimesForDate } = useDateSelection(movieData);
    const { selectedTime, handleTimeSelect } = useTimeSelection(selectedDate, getShowTimesForDate);
    const { selectedSeats, handleSeatSelection } = useSeatSelection();
    const { handleBuy, loadingPurchase, rrrorPurchase } = usePurchase(selectedShowTime, selectedSeats);

    const roomCapacity = selectedShowTime?.roomId?.capacity || 0;
    const reservedSeats = selectedShowTime?.reservedSeats || [];
    const totalPrice = selectedShowTime ? (selectedShowTime.price || 0) * selectedSeats.length : 0;
    const showTimesForSelectedDate = selectedDate ? getShowTimesForDate(format(selectedDate, 'yyyy-MM-dd')) : [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

    if (!movieData) {
        return <div>No movie data available</div>;
    }

    return (
        <MarginWidthWrapper>
            <MovieInfo movie={movieData.data} />

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
                />
            )}

            {selectedShowTime && (
                <TicketSummary
                    selectedSeatsCount={selectedSeats.length}
                    totalPrice={totalPrice}
                    onBuy={handleBuy}
                    showTimeId={selectedShowTime?._id || ''}
                />
            )}
        </MarginWidthWrapper>
    );
};

export default MovieBooking;