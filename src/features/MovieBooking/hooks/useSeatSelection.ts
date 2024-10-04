import { useState, useCallback } from 'react';

export const useSeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const handleSeatSelection = useCallback((seatIndex: number) => {
        setSelectedSeats(prevSeats =>
            prevSeats.includes(seatIndex)
                ? prevSeats.filter(seat => seat !== seatIndex)
                : [...prevSeats, seatIndex]
        );
    }, []);

    return {
        selectedSeats,
        handleSeatSelection,
    };
};