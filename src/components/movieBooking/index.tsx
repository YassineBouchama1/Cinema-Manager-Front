'use client'
import MarginWidthWrapper from '../Wrappers/MarginWidthWrapper';
import MovieInfo from './MovieInfo';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import SeatSelection from './SeatSelection';
import TicketSummary from './TicketSummary';
import { useQuery } from '@tanstack/react-query';
import { getMovie } from '@/hooks/useMovies';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { Movie } from '@/types/movie';
import { ShowTime } from '@/types/showTime';
import { useGlobalTheme } from '@/context/GlobalThemeContext';

interface BuyData {
    showTimeId: string;
    selectedSeats: number[];
    totalPrice: number;
}

const MovieBooking: React.FC = () => {
    const { isModelOpen, currentMovieId, closeModel } = useGlobalTheme();

    // Fetch movie data using React Query
    const { data: movieData, isLoading, error } = useQuery({
        queryKey: ['movie-booking', currentMovieId],
        queryFn: () => {
            if (typeof currentMovieId === 'string') {
                return getMovie(currentMovieId);
            }
            return Promise.reject('No valid movie ID provided');
        },

    });





    // State variables for booking details
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);
    const [roomCapacity, setRoomCapacity] = useState<number>(0);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [reservedSeats, setReservedSeats] = useState<number[]>([]);

    // Reset all selection states
    const resetSelection = useCallback(() => {
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedShowTime(null);
        setSelectedSeats([]);
        setRoomCapacity(0);
        setSelectedRoom(null)
        setReservedSeats([]);
    }, []);

    // Set initial values when movie data changes
    useEffect(() => {
        if (movieData?.showTimes && movieData.showTimes.length > 0) {
            const initialShowTime = movieData.showTimes[0];
            const initialDate = new Date(initialShowTime.startAt);

            setSelectedDate(initialDate);
            setSelectedTime(format(initialDate, 'HH:mm'));
            setSelectedShowTime(initialShowTime);
            setRoomCapacity(initialShowTime.roomId?.capacity || 0);
            setSelectedRoom(initialShowTime.roomId?._id || null);
            setReservedSeats(initialShowTime.reservedSeats || []);
        } else {
            resetSelection();
        }
    }, [movieData, resetSelection]);



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

    if (!movieData) {
        return <div>No movie data available</div>;
    }


    // Get unique dates from show times 
    const uniqueDates = useMemo(() => {
        if (!movieData?.showTimes) return [];
        const datesSet = new Set<string>(
            movieData.showTimes.map(st => format(new Date(st.startAt), 'yyyy-MM-dd'))
        );
        return Array.from(datesSet).sort();
    }, [movieData?.showTimes]);


    // Get show times for specific date
    const getShowTimesForDate = useCallback(
        (date: string) => {
            if (!movieData?.showTimes) return [];
            return movieData.showTimes.filter(st =>
                format(new Date(st.startAt), 'yyyy-MM-dd') === date
            );
        },
        [movieData?.showTimes]
    );

    // Handle seat selection
    const handleSeatSelection = useCallback((seatIndex: number) => {
        setSelectedSeats(prevSeats =>
            prevSeats.includes(seatIndex)
                ? prevSeats.filter(seat => seat !== seatIndex)
                : [...prevSeats, seatIndex]
        );
    }, []);



    // handle date selection
    const handleDateSelect = useCallback((date: string) => {
        const newDate = new Date(date);
        setSelectedDate(newDate);
        const showTimes = getShowTimesForDate(date);
        if (showTimes.length > 0) {
            const firstShowTime = showTimes[0];
            const formattedTime = format(new Date(firstShowTime.startAt), 'HH:mm');
            setSelectedTime(formattedTime);
            setSelectedShowTime(firstShowTime);
            setSelectedSeats([]);
            setRoomCapacity(firstShowTime.roomId?.capacity || 0);
            setSelectedRoom(firstShowTime.roomId?._id || null);
            setReservedSeats(firstShowTime.reservedSeats || []);
        } else {
            resetSelection();
        }
    }, [getShowTimesForDate, resetSelection]);




    // Handle time selection
    const handleTimeSelect = useCallback((time: string) => {
        if (selectedDate) {
            const dateStr = format(selectedDate, 'yyyy-MM-dd');
            const showTimes = getShowTimesForDate(dateStr);
            const newShowTime = showTimes.find(st => format(new Date(st.startAt), 'HH:mm') === time);
            if (newShowTime) {
                setSelectedTime(time);
                setSelectedShowTime(newShowTime);
                setSelectedSeats([]);
                setRoomCapacity(newShowTime.roomId?.capacity || 0);
                setSelectedRoom(newShowTime.roomId?._id || null);
                setReservedSeats(newShowTime.reservedSeats || []);
            }
        }
    }, [selectedDate, getShowTimesForDate]);

    // calculate total price
    const totalPrice = useMemo(() => {
        return selectedShowTime ? (selectedShowTime.price || 0) * selectedSeats.length : 0;
    }, [selectedShowTime, selectedSeats.length]);

    // Get show times for selected date
    const showTimesForSelectedDate = useMemo(() => {
        return selectedDate ? getShowTimesForDate(format(selectedDate, 'yyyy-MM-dd')) : [];
    }, [selectedDate, getShowTimesForDate]);

    // Handle buy action
    const handleBuy = useCallback(() => {
        if (selectedShowTime) {
            const buyData: BuyData = {
                showTimeId: selectedShowTime._id,
                selectedSeats: selectedSeats,
                totalPrice: totalPrice,
            };
            console.log('Buy Data:', buyData);
            alert(`Purchase Successful!\nShowTime ID: ${buyData.showTimeId}\nSeats: ${buyData.selectedSeats.join(', ')}\nTotal Price: ${buyData.totalPrice.toFixed(2)}`);
        } else {
            alert('No showtime selected.');
        }
    }, [selectedShowTime, selectedSeats, totalPrice]);



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