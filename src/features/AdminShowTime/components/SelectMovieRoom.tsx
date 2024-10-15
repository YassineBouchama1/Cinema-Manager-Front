'use client';
import React, { useEffect, useState } from 'react';

import { Movie } from '@/types/movie';
import { Room } from '@/types/room';
import { getMoviesAdmin } from '@/features/AdminMovie/apis/getMoviesAdmin';
import { getRoomsAdmin } from '@/features/AdminRoom/apis/getRoomsAdmin';
import { useShowTimeFormStore } from '../store/showTimeFormStore';

interface SelectMovieRoomProps {

}

const SelectMovieRoom: React.FC<SelectMovieRoomProps> = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const { setMovieId, setRoomId, roomId, movieId, errors } = useShowTimeFormStore()



    // fetch movies and rrom 
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






    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="movieSelect" className="block text-white">Select Movie:</label>
                <select id="movieSelect" value={movieId} onChange={(e) => setMovieId(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-300 rounded">
                    <option value="">-- Select a Movie --</option>
                    {movies.map(movie => (
                        <option key={movie._id} value={movie._id}>{movie.name}</option>
                    ))}
                </select>
                {errors.movieId && <span className="error text-red-500">{errors.movieId}</span>}

            </div>
            <div>
                <label htmlFor="roomSelect" className="block text-white">Select Room:</label>
                <select id="roomSelect" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-300 rounded">
                    <option value="">-- Select a Room --</option>
                    {rooms.map(room => (
                        <option key={room._id} value={room._id}>{room.name}</option>
                    ))}
                </select>
                {errors.roomId && <span className="error text-red-500">{errors.roomId}</span>}

            </div>
        </div>
    );
};

export default SelectMovieRoom;