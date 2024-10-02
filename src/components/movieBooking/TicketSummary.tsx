

import React from 'react';

interface TicketSummaryProps {
  selectedSeatsCount: number;
  totalPrice: number;
  onBuy: () => void;
  showTimeId: string;
}

const TicketSummary: React.FC<TicketSummaryProps> = React.memo(({ selectedSeatsCount, totalPrice, onBuy }) => (
  <div className="bg-blue-500 p-6 rounded-lg h-fit">
    <h3 className="font-bold mb-4">Movie Tickets</h3>
    <div className="flex justify-between mb-2">
      <span>Tickets</span>
      <span>{selectedSeatsCount}</span>
    </div>
    <div className="flex justify-between mb-4">
      <span>Total</span>
      <span>${totalPrice.toFixed(2)}</span>
    </div>
    <button
      className="w-full bg-gray-800 text-white py-2 rounded mb-4"
      onClick={onBuy}
      disabled={selectedSeatsCount === 0}
    >
      Buy
    </button>
  </div>
));

export default TicketSummary;