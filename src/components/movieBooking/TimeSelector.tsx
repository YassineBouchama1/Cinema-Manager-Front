import React from 'react';
import { format } from 'date-fns';
import { ShowTime } from '@/types/showTime';

interface TimeSelectorProps {
    times: ShowTime[];
    selectedTime: string | null;
    onSelect: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = React.memo(({ times, selectedTime, onSelect }) => (
    <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Showtimes</h2>
        <div className="flex space-x-4 overflow-x-auto">
            {times.map((showTime) => (
                <button
                    key={showTime._id}
                    className={`px-4 py-2 rounded-lg ${selectedTime === format(new Date(showTime.startAt), 'HH:mm')
                        ? 'bg-blue-500'
                        : 'bg-gray-700'
                        }`}
                    onClick={() => onSelect(format(new Date(showTime.startAt), 'HH:mm'))}
                >
                    {format(new Date(showTime.startAt), 'HH:mm')}
                </button>
            ))}
        </div>
    </div>
));

export default TimeSelector;