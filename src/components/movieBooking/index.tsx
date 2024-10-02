import React from 'react';
import MarginWidthWrapper from '../Wrappers/MarginWidthWrapper';
import MovieInfo from './MovieInfo';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import SeatSelection from './SeatSelection';
import TicketSummary from './TicketSummary';
import useMovieBooking from '@/hooks/useMovieBooking';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { getMovie } from '@/hooks/useMovies';

const MovieBooking: React.FC = () => {
    const { isModelOpen } = useGlobalTheme();



    if (!isModelOpen) return <h2>no movie id</h2>

    // fetch  one movie by id passed in model 
    const { data: movieData, isLoading } = useQuery({
        queryKey: ['movie', isModelOpen],
        queryFn: () => getMovie(isModelOpen),
        enabled: !!isModelOpen
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!movieData) return <div>No movie data available</div>;

    console.log(movieData);

    const {
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
    } = useMovieBooking(movieData);

    return (
        <MarginWidthWrapper>
            <MovieInfo movie={movieData} />

            {/* Date Selector */}
            <DateSelector
                dates={uniqueDates}
                selectedDate={selectedDate}
                onSelect={handleDateSelect}
            />

            {/* Time Selector */}
            {selectedDate && (
                <TimeSelector
                    times={showTimesForSelectedDate}
                    selectedTime={selectedTime}
                    onSelect={handleTimeSelect}
                />
            )}

            {/* Seat Selection */}
            {selectedShowTime && (
                <SeatSelection
                    selectedSeats={selectedSeats}
                    onSeatSelect={handleSeatSelection}
                />
            )}

            {/* Ticket Summary */}
            {selectedShowTime && (
                <TicketSummary
                    totalPrice={totalPrice}
                    onBuy={handleBuy}
                />
            )}
        </MarginWidthWrapper>
    );
};

export default MovieBooking;