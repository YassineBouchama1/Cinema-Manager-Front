import React from 'react';
import { format } from 'date-fns';

interface DateSelectorProps {
    uniqueDates: string[];
    selectedDate: Date | null;
    onSelectDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = React.memo(({ uniqueDates, selectedDate, onSelectDate }) => (
    <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <div className="flex space-x-4 overflow-x-auto justify-center">
            {uniqueDates.map((date, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 rounded-2xl flex flex-col justify-center ${
                        selectedDate && format(selectedDate, 'yyyy-MM-dd') === date
                            ? 'bg-blue-500'
                            : 'bg-gray-700'
                    }`}
                    onClick={() => onSelectDate(date)}
                >
                    <p>{format(new Date(date), 'MMM')}</p>
                    <p>{format(new Date(date), 'dd')}</p>
                </button>
            ))}
        </div>
    </div>
));

export default DateSelector;
