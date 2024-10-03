'use client'
import React from 'react';
import MarginWidthWrapper from '../Wrappers/MarginWidthWrapper';
import MovieInfo from './MovieInfo';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import SeatSelection from './SeatSelection';
import TicketSummary from './TicketSummary';
import useMovieBooking from '@/hooks/useMovieBooking';
import { useQuery } from '@tanstack/react-query';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { getMovie } from '@/hooks/useMovies';

import { movieDataFake as movieData } from '../../../dumydata/movies';

const MovieBooking: React.FC = () => {
    const { isModelOpen, currentMovieId, closeModel } = useGlobalTheme();

    // Uncomment this when you're ready to use real data
    // const { data: movieData, isLoading, error } = useQuery({
    //     queryKey: ['movie-booking', currentMovieId],
    //     queryFn: () => {
    //         if (typeof currentMovieId === 'string') {
    //             return getMovie(currentMovieId);
    //         }
    //         return Promise.reject('No valid movie ID provided');
    //     },
    //     enabled: isModelOpen && typeof currentMovieId === 'string',
    // });

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error loading movie data</div>;
    // }

    if (!movieData) {
        return <div>No movie data available</div>;
    }

    const bookingHook = useMovieBooking(movieData);
    const {
        selectedRoom,
        selectedDate,
        selectedTime,
        selectedSeats,
        selectedShowTime,
        uniqueDates,
        totalPrice,
        showTimesForSelectedDate,
        handleSeatSelection,
        handleDateSelect,
        handleTimeSelect,
        handleBuy,
        roomCapacity,
        reservedSeats,
    } = bookingHook;

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