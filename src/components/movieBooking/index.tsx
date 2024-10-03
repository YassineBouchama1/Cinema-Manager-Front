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
import { MovieResponse } from '@/types';
import { useSearchParams } from 'next/navigation';


const MovieBooking: React.FC = () => {
    const { isModelOpen, currentMovieId, closeModel } = useGlobalTheme();




    const { data: movieData, isLoading, error } = useQuery({
        queryKey: ['movie-booking', currentMovieId],
        queryFn: () => {
            if (typeof currentMovieId === 'string') {
                return getMovie(currentMovieId);
            }
            return Promise.reject('No valid movie ID provided');
        },
        enabled: isModelOpen && typeof currentMovieId === 'string',
    });







    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading movie data</div>;
    }

    if (!movieData) {
        return <div>No movie data available</div>;
    }
    console.log(movieData)
    // const bookingHook = useMovieBooking(movieData);
    // console.log(bookingHook)
    // const {
    //     selectedDate,
    //     selectedTime,
    //     selectedSeats,
    //     selectedShowTime,
    //     uniqueDates,
    //     totalPrice,
    //     showTimesForSelectedDate,
    //     handleSeatSelection,
    //     handleDateSelect,
    //     handleTimeSelect,
    //     handleBuy,
    // } = bookingHook;

    return (
        <MarginWidthWrapper>
            <MovieInfo movie={movieData.data} />

            {/*  <DateSelector
                dates={uniqueDates}
                selectedDate={selectedDate}
                onSelect={handleDateSelect}
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
                    selectedSeats={selectedSeats}
                    onSeatSelect={handleSeatSelection}
                />
            )}

            {selectedShowTime && (
                <TicketSummary
                    totalPrice={totalPrice}
                    onBuy={handleBuy}
                />
            )} */}
            <h2>hhh</h2>
        </MarginWidthWrapper>
    );
};

export default MovieBooking;