import React from 'react';
import { format } from 'date-fns';
import { ShowTime } from '@/types';

interface TimeSelectorProps {
    selectedDate: Date | null;
    selectedTime: string | null;
    showTimesForDate: ShowTime[];
    onSelectTime: (time: string) => void;
    roomName: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = React.memo(({ selectedDate, selectedTime, showTimesForDate, onSelectTime, roomName }) => (
    <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Showtimes</h2>
        {selectedDate && (
            <div>
                <h3 className="text-md">Room: {roomName}</h3>
                <div className="flex space-x-4 overflow-x-auto">
                    {showTimesForDate.map((showTime) => (
                        <button
                            key={showTime._id}
                            className={`px-4 py-2 rounded-lg ${
                                selectedTime === format(new Date(showTime.startAt), 'HH:mm')
                                    ? 'bg-blue-500'
                                    : 'bg-gray-700'
                            }`}
                            onClick={() => onSelectTime(format(new Date(showTime.startAt), 'HH:mm'))}
                        >
                            {format(new Date(showTime.startAt), 'HH:mm')}
                        </button>
                    ))}
                </div>
            </div>
        )}
    </div>
));

export default TimeSelector;
