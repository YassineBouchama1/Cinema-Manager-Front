'use client';
import React, { useEffect, useState } from 'react';

import { Movie } from '@/types/movie'; // Adjust the import path as necessary
import { Room } from '@/types/room'; // Adjust the import path as necessary
import { getMoviesAdmin } from '@/features/AdminMovie/apis/getMoviesAdmin';
import { getRoomsAdmin } from '@/features/AdminShowTime/apis/getMoviesAdmin';

interface SelectMovieRoomProps {
    onMovieSelect: (movieId: string) => void;
    onRoomSelect: (roomId: string) => void;
}

const SelectMovieRoom: React.FC<SelectMovieRoomProps> = ({ onMovieSelect, onRoomSelect }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<string>('');
    const [selectedRoomId, setSelectedRoomId] = useState<string>('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getMoviesAdmin();
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const fetchRooms = async () => {
            try {
                const response = await getRoomsAdmin();
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchMovies();
        fetchRooms();
    }, []);

    const handleMovieChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const movieId = event.target.value;
        setSelectedMovieId(movieId);
        onMovieSelect(movieId);
    };

    const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const roomId = event.target.value;
        setSelectedRoomId(roomId);
        onRoomSelect(roomId);
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="movieSelect" className="block text-white">Select Movie:</label>
                <select id="movieSelect" value={selectedMovieId} onChange={handleMovieChange} className="w-full p-2 bg-gray-800 border border-gray-300 rounded">
                    <option value="">-- Select a Movie --</option>
                    {movies.map(movie => (
                        <option key={movie._id} value={movie._id}>{movie.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="roomSelect" className="block text-white">Select Room:</label>
                <select id="roomSelect" value={selectedRoomId} onChange={handleRoomChange} className="w-full p-2 bg-gray-800 border border-gray-300 rounded">
                    <option value="">-- Select a Room --</option>
                    {rooms.map(room => (
                        <option key={room._id} value={room._id}>{room.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectMovieRoom;