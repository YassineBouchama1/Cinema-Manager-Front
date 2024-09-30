import { Movie } from '@/types/showTime';
import React from 'react';

interface ShowTimeCardProps {
    movie: Movie;
    onBuyTickets: (movieId: string) => void;
}
const ShowTimeCard: React.FC<ShowTimeCardProps> = ({ movie, onBuyTickets }) => (
    <div className="group rounded-lg overflow-hidden shadow-lg md:w-64 w-full ">
        <img src={movie.posterUrl} alt={movie.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" />
        <div className="p-4">
            <h3 className="text-black font-bold text-lg mb-2">{movie.title}</h3>
            <div className="flex justify-between text-sm mb-2">
                <span className="text-black">{movie.language}</span>
                <span className="text-black">{movie.ageRating}</span>
                {movie.subtitles && <span className="text-black">{movie.subtitles}</span>}
            </div>
            <div className="flex justify-between text-sm mb-4">
                <span className="text-purple-500">{movie.dimension}</span>
                <span className="text-black">{movie.duration}</span>
            </div>
            <button
                onClick={() => onBuyTickets(movie.id)}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-black/60 transition-colors"
            >
                Buy Tickets
            </button>
        </div>
    </div>
);

export default ShowTimeCard;