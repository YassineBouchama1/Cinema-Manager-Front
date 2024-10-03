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
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);



    // initialize the selected date and showtime when movieData changes
    useEffect(() => {
        if (movieData.showTimes.length > 0) {
            const initialShowTime = movieData.showTimes[0];
            const initialDate = new Date(initialShowTime.startAt);
            setSelectedDate(initialDate);
            setSelectedTime(format(initialDate, 'HH:mm'));
            setSelectedShowTime(initialShowTime);
        } else {
            resetSelection();
        }
    }, [movieData]);



    // rset selection state
    const resetSelection = () => {
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedShowTime(null);
        setSelectedSeats([]);
    };

    //this fpr get unique dates from showTime
    const uniqueDates = useMemo(() => {
        const datesSet = new Set<string>(
            movieData.showTimes.map(st => format(new Date(st.startAt), 'yyyy-MM-dd'))
        );
        return Array.from(datesSet).sort();
    }, [movieData.showTimes]);



    // het showtimes for specific date
    const getShowTimesForDate = useCallback(
        (date: string) => movieData.showTimes.filter(st => format(new Date(st.startAt), 'yyyy-MM-dd') === date),
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




    // this forandle date selection
    const handleDateSelect = useCallback((date: string) => {
        const newDate = new Date(date);
        setSelectedDate(newDate);
        const showTimes = getShowTimesForDate(date);
        if (showTimes.length > 0) {
            const firstShowTime = showTimes[0];
            const formattedTime = format(new Date(firstShowTime.startAt), 'HH:mm');
            setSelectedTime(formattedTime);
            setSelectedShowTime(firstShowTime);
            setSelectedSeats([]); // reset seat selection
        } else {
            resetSelection();
        }
    }, [getShowTimesForDate]);




    // handle time selection
    const handleTimeSelect = useCallback((time: string) => {
        if (selectedDate) {
            const dateStr = format(selectedDate, 'yyyy-MM-dd');
            const showTimes = getShowTimesForDate(dateStr);
            const newShowTime = showTimes.find(st => format(new Date(st.startAt), 'HH:mm') === time);
            if (newShowTime) {
                setSelectedTime(time);
                setSelectedShowTime(newShowTime);
                setSelectedSeats([]); // reset seat selection
            }
        }
    }, [selectedDate, getShowTimesForDate]);




    // calculate total price
    const totalPrice = useMemo(() => {
        return selectedShowTime ? selectedShowTime.price * selectedSeats.length : 0;
    }, [selectedShowTime, selectedSeats.length]);




    // get showtimes for the selected date
    const showTimesForSelectedDate = useMemo(() => {
        return selectedDate ? getShowTimesForDate(format(selectedDate, 'yyyy-MM-dd')) : [];
    }, [selectedDate, getShowTimesForDate]);




    // handle Buy button click
    const handleBuy = useCallback(() => {
        if (selectedShowTime) {
            const buyData: BuyData = {
                showTimeId: selectedShowTime._id,
                selectedSeats: selectedSeats,
                totalPrice: totalPrice,
            };

            // TODO: Send This To APi
            console.log('Buy Data:', buyData);
            alert(`Purchase Successful!\nShowTime ID: ${buyData.showTimeId}\nSeats: ${buyData.selectedSeats.join(', ')}\nTotal Price: $${buyData.totalPrice.toFixed(2)}`);
        } else {
            alert('No showtime selected.');
        }
    }, [selectedShowTime, selectedSeats, totalPrice]);




    return {
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
    };
};

export default useMovieBooking;
