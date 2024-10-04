'use client'
import React from 'react';
import MovieInfo from './MovieInfo';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import SeatSelection from './SeatSelection';
import TicketSummary from './TicketSummary';
import { useGlobalTheme } from '@/context/GlobalThemeContext';

import toast from 'react-hot-toast';
import { useMovieBooking } from '../hooks/useMovieBooking';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';
import { usePurchase } from '../hooks/usePurchase';

const MovieBooking: React.FC = () => {
    const { currentMovieId } = useGlobalTheme();


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
        setSelectedSeats

    } = useMovieBooking({ currentMovieId });


    const { handleBuy, loadingPurchase, errorPurchase } = usePurchase(selectedShowTime, selectedSeats, setSelectedSeats);



    console.log(loadingPurchase)
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
                    loading={loadingPurchase}

                />
            )}
        </MarginWidthWrapper>
    );
};

export default MovieBooking;