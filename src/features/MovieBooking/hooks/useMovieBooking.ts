'use client'
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ShowTime } from '@/types/showTime';
import { MovieData } from '@/types';
import { getMovie } from '@/features/MovieRecommendations/apis/getMovie';

// Define the properties expected by the hook
interface UseMovieBookingProps {
  currentMovieId: string | null; // The ID of the current movie, or null if not set
}

// Define the return type of the hook
interface UseMovieBookingReturn {
  movieData: MovieData | undefined;
  isLoading: boolean;
  error: unknown;
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedSeats: number[];
  selectedShowTime: ShowTime | null;
  roomCapacity: number;
  reservedSeats: number[];
  uniqueDates: string[];
  showTimesForSelectedDate: ShowTime[];
  totalPrice: number;
  handleDateSelect: (date: string) => void;
  handleTimeSelect: (time: string) => void;
  handleSeatSelection: (seatIndex: number) => void;
  setSelectedSeats: React.Dispatch<React.SetStateAction<number[]>>;
  seatsPerRow: number
  // handleBuy: () => void; 
}

// custom hook to manage movie booking logic 
export const useMovieBooking = ({ currentMovieId }: UseMovieBookingProps): UseMovieBookingReturn => {



  // getch movie data using React Query
  const { data: movieData, isLoading, error } = useQuery<MovieData>({
    queryKey: ['movie-booking', currentMovieId],
    queryFn: () => {

      //  here iam rnsure the movie ID is valid before fetching
      if (typeof currentMovieId === 'string' && currentMovieId) {
        return getMovie(currentMovieId);
      }
      return Promise.reject('No valid movie ID provided'); // if there is no id return error
    },
  });

  // here iam declar state variables for managing booking details
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);
  const [roomCapacity, setRoomCapacity] = useState<number>(0);
  const [seatsPerRow, setSeatsPerRow] = useState<number>(10);
  const [reservedSeats, setReservedSeats] = useState<number[]>([]);

  // this fun for reset all selection states
  const resetSelection = useCallback(() => {
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedShowTime(null);
    setSelectedSeats([]);
    setRoomCapacity(0);
    setSeatsPerRow(10);
    setReservedSeats([]);
  }, []);





  //  here when  when data movie fetched i set initial values when movie data changes
  useEffect(() => {
    if (movieData?.showTimes && movieData.showTimes.length > 0) {
      const initialShowTime = movieData.showTimes[0];
      const initialDate = new Date(initialShowTime.startAt);

      setSelectedDate(initialDate);
      setSelectedTime(format(initialDate, 'HH:mm'));
      setSelectedShowTime(initialShowTime);
      setRoomCapacity(initialShowTime.roomId?.capacity || 0);
      setSeatsPerRow(initialShowTime.roomId?.seatsPerRow || 10);
      setReservedSeats(initialShowTime.reservedSeats || []);
    } else {
      resetSelection();
    }
  }, [movieData, resetSelection]);



  // get unique dates from showtimes
  const uniqueDates = useMemo(() => {
    if (!movieData?.showTimes) return [];
    const datesSet = new Set<string>(
      movieData.showTimes.map(st => format(new Date(st.startAt), 'yyyy-MM-dd'))
    );
    return Array.from(datesSet).sort();
  }, [movieData?.showTimes]);




  // fet showtimes for a specific date
  const getShowTimesForDate = useCallback(
    (date: string) => {
      if (!movieData?.showTimes) return [];
      return movieData.showTimes.filter(st =>
        format(new Date(st.startAt), 'yyyy-MM-dd') === date
      );
    },
    [movieData?.showTimes]
  );

  // handle seat selection
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
      setSeatsPerRow(firstShowTime.roomId?.seatsPerRow || 10);
      setReservedSeats(firstShowTime.reservedSeats || []);
    } else {
      resetSelection();
    }
  }, [getShowTimesForDate, resetSelection]);




  // handle time selection
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
        setSeatsPerRow(newShowTime.roomId?.seatsPerRow || 10);
        setReservedSeats(newShowTime.reservedSeats || []);
      }
    }
  }, [selectedDate, getShowTimesForDate]);

  // calcul total price based ob selected seats
  const totalPrice = useMemo(() => {
    return selectedShowTime ? (selectedShowTime.price || 0) * selectedSeats.length : 0;
  }, [selectedShowTime, selectedSeats.length]);

  // get showtimes for the selected date
  const showTimesForSelectedDate = useMemo(() => {
    return selectedDate ? getShowTimesForDate(format(selectedDate, 'yyyy-MM-dd')) : [];
  }, [selectedDate, getShowTimesForDate]);




  return {
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
    setSelectedSeats,
    seatsPerRow
  };
};