import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MovieTypeTMPD, searchMovies } from '../apis/tmdbApi';

interface MovieSearchProps {
    onSelectMovie: (movie: MovieTypeTMPD) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSelectMovie }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<MovieTypeTMPD[]>([]);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 2) { // Fetch suggestions only if query length is greater than 2
            try {
                const results = await searchMovies(query);
                setSuggestions(results);
            } catch (error) {
                console.error('Error fetching movie suggestions:', error);
                setSuggestions([]); // Clear suggestions on error
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleMovieSelect = (movie: MovieTypeTMPD) => {
        onSelectMovie(movie);
        setSearchQuery(''); // Clear search input
        setSuggestions([]); // Clear suggestions
    };

    return (
        <div className="relative mb-4">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a movie..."
                className="w-full p-2 bg-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {suggestions.length > 0 && (
                <div className="absolute bg-gray-900 rounded shadow-lg mt-1 w-full">
                    {suggestions.map((movie) => (
                        <div
                            key={movie.id} // Use a unique identifier
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-700"
                            onClick={() => handleMovieSelect(movie)}
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w50${movie.poster_path}`} // Use TMDb image URL
                                alt={movie.title}
                                width={50}
                                height={75}
                                className="mr-2"
                            />
                            <span>{movie.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieSearch;