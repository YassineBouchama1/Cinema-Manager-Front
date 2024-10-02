import React from 'react';

interface TicketSummaryProps {
  selectedSeats: string[];
}

const TicketSummary: React.FC<TicketSummaryProps> = ({ selectedSeats }) => {
  const ticketPrice = 20; // Assuming $20 per ticket

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">MOVIE TICKETS</h3>
      <p>Date & Time: 12/07/2022, 20:00 PM</p>
      <p>Tickets (Double comfort): {selectedSeats.join(', ')}</p>
      <p>Total: ${selectedSeats.length * ticketPrice}</p>
      
      <div className="bg-blue-400 text-gray-900 p-4 rounded-lg mt-4">
        <p>Tickets (Double comfort): {selectedSeats.length}</p>
        <p>Type: 2D</p>
        <p className="text-xl font-bold mt-2">TOTAL PRICE: ${selectedSeats.length * ticketPrice}</p>
        <button className="w-full bg-gray-900 text-white py-2 rounded-lg mt-4">ADD PARKING</button>
        <button className="w-full bg-gray-900 text-white py-2 rounded-lg mt-2">BUY</button>
      </div>
    </div>
  );
};

export default TicketSummary;