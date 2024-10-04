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
import { useMovieBooking } from '../hooks/useMovieBooking';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';

const MovieBooking: React.FC = () => {
    const { isModelOpen, currentMovieId } = useGlobalTheme();
    const { openModelAuth } = useAuthFormContext();
    const { session } = useAuthContext();

    if (!currentMovieId) return toast.error('id movie required');

    const {
        movieData,
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
        handleBuy,
    } = useMovieBooking({ currentMovieId });

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