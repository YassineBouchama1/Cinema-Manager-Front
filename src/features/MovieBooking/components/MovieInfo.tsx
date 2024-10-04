import React from 'react';
import { Play } from 'lucide-react';
import { Movie } from '@/types/movie';

export interface MovieInfoProps {
    movie: Movie;
}
const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
    console.log(movie)
    return (

        < section className="movie-info" >
            <div className="flex flex-col justify-center items-center md:flex-row md:items-start">
                <div className='flex justify-center'>
                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.image}`} alt={movie.name} className="w-80 h-full object-cover rounded-lg" />
                </div>
                <div className='md:w-1/2 md:pl-10 flex flex-col gap-5 justify-start items-start'>
                    <h2 className="text-4xl font-bold mb-2">{movie.name}</h2>
                    <div className="flex space-x-2 mb-4">
                        <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">{movie.category}</span>
                    </div>
                    <p className="text-gray-400 mb-4">Duration: {movie.duration} minutes</p>
                    <button className="flex self-center md:self-start items-center w-auto bg-gray-800 hover:bg-gray-700 duration-300 px-4 py-2 rounded-full">
                        <Play size={16} />
                        <span>Watch Trailer</span>
                    </button>
                </div>
            </div>
        </section >
    );
}

export default React.memo(MovieInfo);