'use client'
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { Movie } from '@/types/showTime';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

interface ShowTimeCardProps {
    movie: Movie;

}
const ShowTimeCard: React.FC<ShowTimeCardProps> = ({ movie }) => {
    const { isModelOpen, toggleModel } = useGlobalTheme();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const updateURL = useCallback((shouldAddMovieId: boolean) => {
        const params = new URLSearchParams(searchParams);
        if (shouldAddMovieId) {
            params.set('movieId', movie.id);
        } else {
            params.delete('movieId');
        }
        router.push(`${pathname}?${params.toString()}`);
    }, [movie.id, searchParams, pathname, router]);

    const onBuyTickets = () => {
        updateURL(true);
        toggleModel();
    };

    useEffect(() => {
        if (!isModelOpen && searchParams.get('movieId') === movie.id) {
            updateURL(false);
        }
    }, [isModelOpen, searchParams, movie.id, updateURL]);

    return (

        <div className=" rounded-lg overflow-hidden shadow-lg md:w-64 w-full ">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-200 ease-in-out" />
            <div className="p-4">
                <h3 className="text-gray-800 font-bold text-lg mb-2">{movie.title}</h3>
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-800">{movie.language}</span>
                    <span className="text-gray-800">{movie.ageRating}</span>
                    {movie.subtitles && <span className="text-gray-800">{movie.subtitles}</span>}
                </div>
                <div className="flex justify-between text-sm mb-4">
                    <span className="text-purple-500">{movie.dimension}</span>
                    <span className="text-gray-800">{movie.duration}</span>
                </div>
                <button
                    onClick={() => onBuyTickets(movie.id)}
                    className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-black/60 transition-colors"
                >
                    Buy Tickets
                </button>
            </div>

        </div>
    )
}

export default ShowTimeCard;