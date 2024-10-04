import { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { ShowTime } from '@/types/showTime';

export const useTimeSelection = (selectedDate: Date | null, getShowTimesForDate: (date: string) => ShowTime[]) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);

  const handleTimeSelect = useCallback((time: string) => {
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const showTimes = getShowTimesForDate(dateStr);
      const newShowTime = showTimes.find(st => format(new Date(st.startAt), 'HH:mm') === time);
      if (newShowTime) {
        setSelectedTime(time);
        setSelectedShowTime(newShowTime);
      }
    }
  }, [selectedDate, getShowTimesForDate]);

  return {
    selectedTime,
    selectedShowTime,
    handleTimeSelect,
  };
};