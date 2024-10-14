'use client'
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ShowTime } from '@/types/showTime';

import { showTimesBelongMovie } from '../apis/showTimesBelongMovie';
import { useUserModalSwapperContext } from '@/context/user/UserModalSwapperContext';

// define the properties expected by the hook
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
  seatsPerRow: number

}

// custom hook to manage movie booking logic 
export const useShowTimeBooking = ({ currentMovieId }: UseShowTimeBookingProps): UseShowTimeBookingReturn => {

  const { currentModalSwapper } = useUserModalSwapperContext();


  // getch movie data using React Query
  const { data: showTimes, isLoading, error } = useQuery<ShowTime[] | any>({
    queryKey: ['showtimes-booking', currentMovieId],
    queryFn: () => {

      //  here iam rnsure the movie ID is valid before fetching
      if (typeof currentMovieId === 'string' && currentMovieId) {
        return showTimesBelongMovie(currentMovieId);
      }
      return Promise.reject('No valid movie ID provided'); // if there is no id return error
    },
    enabled: currentModalSwapper === 'showtimes', //  fetch ony if we open showtime field
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



  // get unique dates from showtimes
  const uniqueDates = useMemo(() => {
    if (!showTimes) return [];
    const datesSet = new Set<string>(
      showTimes?.map((st: { startAt: string | number | Date; }) => format(new Date(st.startAt), 'yyyy-MM-dd'))
    );
    return Array.from(datesSet).sort();
  }, [showTimes]);




  // fet showtimes for a specific date
  const getShowTimesForDate = useCallback(
    (date: string) => {
      if (!showTimes) return [];
      return showTimes?.filter((st: { startAt: string | number | Date; }) =>
        format(new Date(st.startAt), 'yyyy-MM-dd') === date
      );
    },
    [showTimes]
  );

  // handle seat selection
  const handleSeatSelection = useCallback((seatIndex: number) => {
    setSelectedSeats(prevSeats =>
      prevSeats.includes(seatIndex)
        ? prevSeats?.filter(seat => seat !== seatIndex)
        : [...prevSeats, seatIndex]
    );
  }, []);





  // handle date selection
  const handleDateSelect = useCallback((date: string) => {
    const newDate = new Date(date);
    setSelectedDate(newDate);
    const showTimes = getShowTimesForDate(date);
    if (showTimes?.length > 0) {
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
      const newShowTime = showTimes?.find((st: { startAt: string | number | Date; }) => format(new Date(st.startAt), 'HH:mm') === time);
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