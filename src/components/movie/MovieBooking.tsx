import React, { useState } from 'react';
import { Play } from 'lucide-react';
import MarginWidthWrapper from '../Wrappers/MarginWidthWrapper';

interface Movie {
  title: string;
  description: string;
  image: string;
  genres: string[];
}

const MovieBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(12);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const movie: Movie = {
    title: "Aquatic Journey: The Deep Blue Way",
    description: "An explorer and his family embark on an underwater adventure, facing challenges and discovering the wonders of a submerged world.",
    image: "http://localhost:3000/_next/image?url=http%3A%2F%2F127.0.0.1%3A4000%2Fmovies%2F66fd038d87ea098f50ae95ed-1727859621851-79069328.png&w=1920&q=75",
    genres: ["Adventure", "Sci-Fi", "Family"]
  };

  const dates = [8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <MarginWidthWrapper>

      <div className="bg-gray-900 text-white min-h-screen p-8 ">


        <main className=" gap-8 flex flex-col">
          <section className="movie-info">
            <div className="flex flex-col justify-center  items-center  md:flex-row md:items-start">

              <div className='flex justify-center'>
                <img src={movie.image} alt={movie.title} className="w-80 h-full object-cover rounded-lg" />

              </div>
              <div className=' md:w-1/2 md:pl-10  flex flex-col gap-5 justify-start items-start'>
                <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
                <div className="flex space-x-2 mb-4">
                  {movie.genres.map((genre, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-600 rounded-full text-xs">{genre}</span>
                  ))}
                </div>
                <p className="text-gray-400 mb-4">{movie.description}</p>
                <button className="flex  self-center md:self-start items-center w-auto bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full">
                  <Play size={16} />
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>
          </section>

          {/* <section className="booking-info">
          <div className="date-picker flex space-x-2 mb-6">
          {dates.map(date => (
            <button
            key={date}
            className={`w-12 h-12 rounded-full ${selectedDate === date ? 'bg-blue-500' : 'bg-gray-800'}`}
            onClick={() => setSelectedDate(date)}
            >
            {date}
            </button>
            ))}
            </div>
            
            <div className="showtime-picker flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-6">
            <span>20:00PM</span>
            <span>3D</span>
            <span>OCEAN MALL</span>
            </div>
            
            <div className="seat-selection bg-gray-800 p-4 rounded-lg mb-6">
            <div className="screen w-full h-1 bg-blue-500 rounded mb-8"></div>
            <div className="seats grid grid-cols-10 gap-2">
            {[...Array(100)].map((_, index) => (
              <button
              key={index}
              className={`w-6 h-6 rounded-sm ${selectedSeats.includes(index) ? 'bg-blue-500' : 'bg-gray-700'
              }`}
              onClick={() => {
                if (selectedSeats.includes(index)) {
                  setSelectedSeats(selectedSeats.filter(seat => seat !== index));
                  } else {
                    setSelectedSeats([...selectedSeats, index]);
                }
                }}
                ></button>
                ))}
                </div>
                </div>
                
                <div className="checkout bg-blue-500 p-4 rounded-lg">
                <div className="flex justify-between mb-4">
                <span>Selected Seats</span>
                <span>{selectedSeats.length}</span>
                </div>
                <div className="flex justify-between mb-4">
                <span>Total Price</span>
                <span>${selectedSeats.length * 10}</span>
                </div>
                <button className="w-full bg-gray-900 text-white py-2 rounded-lg">
                Book Tickets
                </button>
                </div>
                </section> */}
        </main>
      </div>
    </MarginWidthWrapper >
  );
};

export default MovieBooking;