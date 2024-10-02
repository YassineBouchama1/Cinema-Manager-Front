import React, { useState } from 'react';
import DateSelector from './DateSelector';
import SeatMap from './SeatMap';
import TicketSummary from './TicketSummary';


const SeatSelectionPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('12');
  const [selectedTime, setSelectedTime] = useState<string>('20:00 PM');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg">
      <div className="flex justify-between mb-8">
        <DateSelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        <div>
          <span className="mr-4">Time {selectedTime}</span>
          <span className="mr-4">Type 2D</span>
          <span>Address OCEAN MALL</span>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
      <div className="flex">
        <div className="w-2/3">
          <SeatMap selectedSeats={selectedSeats} onSeatSelect={setSelectedSeats} />
        </div>
        <div className="w-1/3 pl-8">
          <TicketSummary selectedSeats={selectedSeats} />
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;