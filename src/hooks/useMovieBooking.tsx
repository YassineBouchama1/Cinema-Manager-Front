import { useState, useEffect, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { Movie } from '@/types/movie';
import { ShowTime } from '@/types/showTime';


interface MovieData {
    data: Movie;
    showTimes: ShowTime[];
}

interface BuyData {
    showTimeId: string;
    selectedSeats: number[];
    totalPrice: number;
}

const useMovieBooking = (movieData: MovieData) => {


    // state variables for booking details
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);
    const [roomCapacity, setRoomCapacity] = useState<number>(0);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [reservedSeats, setReservedSeats] = useState<number[]>([]);

    // set initial values when movie data changes
    // will run first
    useEffect(() => {
        if (movieData.showTimes && movieData.showTimes.length > 0) {
            const initialShowTime = movieData.showTimes[0];
            const initialDate = new Date(initialShowTime.startAt);

            console.log(initialShowTime)
            setSelectedDate(initialDate);
            setSelectedTime(format(initialDate, 'HH:mm'));
            setSelectedShowTime(initialShowTime);
            setRoomCapacity(initialShowTime.roomId?.capacity || 0);
            setSelectedRoom(initialShowTime.roomId?._id || null);
            setReservedSeats(initialShowTime.reservedSeats || []);
        } else {
            resetSelection();
        }
    }, [movieData]); // change every time  moviedata chaneg or movie change



    // reset all selection states if there is no movie data
    const resetSelection = useCallback(() => {
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedShowTime(null);
        setSelectedSeats([]);
        setRoomCapacity(0);
        setSelectedRoom(null)
        setReservedSeats([]);
    }, []);


    //here i refactore showtime date  unique dates 
    const uniqueDates = useMemo(() => {
        if (!movieData.showTimes) return [];
        const datesSet = new Set<string>(
            movieData.showTimes.map(st => format(new Date(st.startAt), 'yyyy-MM-dd'))
        );
        return Array.from(datesSet).sort();
    }, [movieData.showTimes]);



    // here i show times for specific date
    const getShowTimesForDate = useCallback(
        (date: string) => {
            if (!movieData.showTimes) return [];
            return movieData.showTimes.filter(st => format(new Date(st.startAt), 'yyyy-MM-dd') === date);
        },
        [movieData.showTimes]
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

    // get show times for selected date
    const showTimesForSelectedDate = useMemo(() => {
        return selectedDate ? getShowTimesForDate(format(selectedDate, 'yyyy-MM-dd')) : [];
    }, [selectedDate, getShowTimesForDate]);

    // handle buy action
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



    // return all necessary values and functions
    return {
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
    };
};



export default useMovieBooking;