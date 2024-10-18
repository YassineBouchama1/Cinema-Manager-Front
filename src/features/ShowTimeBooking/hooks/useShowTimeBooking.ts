'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ShowTime } from '@/types/showTime';
import { showTimesBelongMovie } from '../apis/showTimesBelongMovie';
import { useMovieDetailsStore } from '@/features/MovieDetails/store/MovieDetailsStore.user';

// Define the properties expected by the hook
interface UseShowTimeBookingProps {
  currentMovieId: string;
}

// Define the return type of the hook
interface UseShowTimeBookingReturn {
  showTimes: ShowTime[] | undefined;
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
  seatsPerRow: number;
}

// Custom hook to manage movie booking logic 
export const useShowTimeBooking = ({ currentMovieId }: UseShowTimeBookingProps): UseShowTimeBookingReturn => {
  const { currentModalSwapper } = useMovieDetailsStore();

  // Fetch movie data using React Query
  const { data: showTimes, isLoading, error } = useQuery<ShowTime[], Error>({
    queryKey: ['showtimes-booking', currentMovieId],
    queryFn: async () => {
      if (typeof currentMovieId === 'string' && currentMovieId) {
        console.log('inside query');
        const response = await showTimesBelongMovie(currentMovieId);
        return response.showtimes; // Ensure this matches your API response structure
      }
      throw new Error('No valid movie ID provided'); // Return error if there is no ID
    },
    enabled: currentModalSwapper === 'showtimes', // Fetch only if we open showtime field
  });

  // State variables for managing booking details
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);
  const [roomCapacity, setRoomCapacity] = useState<number>(0);
  const [seatsPerRow, setSeatsPerRow] = useState<number>(10);
  const [reservedSeats, setReservedSeats] = useState<number[]>([]);

  // Function to reset all selection states
  const resetSelection = useCallback(() => {
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedShowTime(null);
    setSelectedSeats([]);
    setRoomCapacity(0);
    setSeatsPerRow(10);
    setReservedSeats([]);
  }, []);

  // Set initial values when movie data changes
  useEffect(() => {
    if (showTimes && showTimes.length > 0) {
      const initialShowTime = showTimes[0];
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
  }, [showTimes, resetSelection]);

  // Get unique dates from showtimes
  const uniqueDates = useMemo(() => {
    if (!showTimes) return [];
    const datesSet = new Set<string>(
      showTimes.map((st) => format(new Date(st.startAt), 'yyyy-MM-dd'))
    );
    return Array.from(datesSet).sort();
  }, [showTimes]);

  // Fetch showtimes for a specific date
  const getShowTimesForDate = useCallback(
    (date: string) => {
      if (!showTimes) return [];
      return showTimes.filter((st) =>
        format(new Date(st.startAt), 'yyyy-MM-dd') === date
      );
    },
    [showTimes]
  );

  // Handle seat selection
  const handleSeatSelection = useCallback((seatIndex: number) => {
    setSelectedSeats(prevSeats =>
      prevSeats.includes(seatIndex)
        ? prevSeats.filter(seat => seat !== seatIndex)
        : [...prevSeats, seatIndex]
    );
  }, []);

  // Handle date selection
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

  // Handle time selection
  const handleTimeSelect = useCallback((time: string) => {
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const showTimes = getShowTimesForDate(dateStr);
      const newShowTime = showTimes.find((st) => format(new Date(st.startAt), 'HH:mm') === time);
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

  // Calculate total price based on selected seats
  const totalPrice = useMemo(() => {
    return selectedShowTime ? (selectedShowTime.price || 0) * selectedSeats.length : 0;
  }, [selectedShowTime, selectedSeats.length]);

  // Get showtimes for the selected date
  const showTimesForSelectedDate = useMemo(() => {
    return selectedDate ? getShowTimesForDate(format(selectedDate, 'yyyy-MM-dd')) : [];
  }, [selectedDate, getShowTimesForDate]);

  return {
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
    setSelectedSeats,
    seatsPerRow
  };
};