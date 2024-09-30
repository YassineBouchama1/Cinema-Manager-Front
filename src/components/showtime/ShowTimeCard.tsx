import React from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';

interface ShowTimeCardProps extends Movie { }

const ShowTimeCard: React.FC<ShowTimeCardProps> = (movie) => (
    <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="flex">
            <div className="w-1/3 relative">
                <Image src={movie.image} alt={movie.title} layout="fill" objectFit="cover" />
                <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                    {movie.rating}
                </div>
            </div>
            <div className="w-2/3 p-4">
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-sm text-gray-400 mb-2">Genres: {movie.genres.join(', ')}</p>
                <p className="text-sm mb-4">{movie.description}</p>
                <div className="flex space-x-2 mb-4">
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{movie.language}</span>
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{movie.rating}</span>
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{movie.dimension}</span>
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{movie.duration}</span>
                </div>
                <h3 className="font-semibold mb-2">Session Times:</h3>
                {movie.showTimes.map((showTime, index) => (
                    <div key={index} className="mb-2">
                        <p className="text-sm font-medium">{showTime.date}:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {showTime.times.map((time, timeIndex) => (
                                <span key={timeIndex} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                                    {time}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Buy Tickets
                </button>
            </div>
        </div>
    </div>
);

export default ShowTimeCard;