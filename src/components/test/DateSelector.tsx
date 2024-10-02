import React from 'react';

interface DateSelectorProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateSelect }) => {
  const dates = ['09', '10', '11', '12', '13', '14', '15'];

  return (
    <div className="flex space-x-2">
      <span className="mr-2">Date</span>
      {dates.map((date) => (
        <button
          key={date}
          className={`w-10 h-10 rounded-full ${
            selectedDate === date ? 'bg-blue-400 text-gray-900' : 'bg-gray-800'
          }`}
          onClick={() => onDateSelect(date)}
        >
          {date}
        </button>
      ))}
    </div>
  );
};

export default DateSelector;