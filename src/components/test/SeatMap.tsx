import React from 'react';

interface SeatMapProps {
  selectedSeats: string[];
  onSeatSelect: (seats: string[]) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ selectedSeats, onSeatSelect }) => {
  const rows = 'ABCDEFGHIJ'.split('');
  const cols = Array.from({ length: 18 }, (_, i) => i + 1);

  const handleSeatClick = (seat: string) => {
    const updatedSeats = selectedSeats.includes(seat)
      ? selectedSeats.filter(s => s !== seat)
      : [...selectedSeats, seat];
    onSeatSelect(updatedSeats);
  };

  return (
    <div className="relative">
      <div className="w-full h-8 bg-gray-700 rounded-full mb-8 flex items-center justify-center">
        SCREEN
      </div>
      <div className="grid grid-cols-18 gap-1">
        {rows.map(row => (
          <React.Fragment key={row}>
            <div className="text-center">{row}</div>
            {cols.map(col => (
              <button
                key={`${row}${col}`}
                className={`w-6 h-6 rounded-sm ${
                  selectedSeats.includes(`${row}${col}`)
                    ? 'bg-blue-400'
                    : 'bg-gray-700'
                }`}
                onClick={() => handleSeatClick(`${row}${col}`)}
              />
            ))}
            <div className="text-center">{row}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <span className="flex items-center"><div className="w-4 h-4 bg-gray-700 mr-2" /> Normal</span>
        <span className="flex items-center"><div className="w-4 h-4 bg-gray-600 mr-2" /> Comfort</span>
        <span className="flex items-center"><div className="w-4 h-4 bg-gray-500 mr-2" /> Double Comfort</span>
        <span className="flex items-center"><div className="w-4 h-4 bg-gray-400 mr-2" /> Available</span>
        <span className="flex items-center"><div className="w-4 h-4 bg-red-400 mr-2" /> For Disabilities</span>
        <span className="flex items-center"><div className="w-4 h-4 bg-blue-400 mr-2" /> Selected</span>
        <span className="flex items-center"><div className="w-4 h-4 bg-gray-800 mr-2" /> Taken</span>
      </div>
    </div>
  );
};

export default SeatMap;