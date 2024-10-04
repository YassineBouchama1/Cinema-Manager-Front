import { useState, useEffect, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { ShowTime } from '@/types/showTime';
import { MovieData } from '@/types';

export const useDateSelection = (movieData: MovieData | undefined) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);

  const resetSelection = useCallback(() => {
    setSelectedDate(null);
    setSelectedShowTime(null);
  }, []);

  useEffect(() => {
    if (movieData?.showTimes && movieData.showTimes.length > 0) {
      const initialShowTime = movieData.showTimes[0];
      const initialDate = new Date(initialShowTime.startAt);
      setSelectedDate(initialDate);
      setSelectedShowTime(initialShowTime);
    } else {
      resetSelection();
    }
  }, [movieData, resetSelection]);

  const uniqueDates = useMemo(() => {
    if (!movieData?.showTimes) return [];
    const datesSet = new Set<string>(
      movieData.showTimes.map(st => format(new Date(st.startAt), 'yyyy-MM-dd'))
    );
    return Array.from(datesSet).sort();
  }, [movieData?.showTimes]);

  const getShowTimesForDate = useCallback(
    (date: string) => {
      if (!movieData?.showTimes) return [];
      return movieData.showTimes.filter(st =>
        format(new Date(st.startAt), 'yyyy-MM-dd') === date
      );
    },
    [movieData?.showTimes]
  );

  const handleDateSelect = useCallback((date: string) => {
    const newDate = new Date(date);
    setSelectedDate(newDate);
    const showTimes = getShowTimesForDate(date);
    if (showTimes.length > 0) {
      setSelectedShowTime(showTimes[0]);
    } else {
      resetSelection();
    }
  }, [getShowTimesForDate, resetSelection]);

  return {
    selectedDate,
    selectedShowTime,
    uniqueDates,
    handleDateSelect,
    getShowTimesForDate,
  };
};