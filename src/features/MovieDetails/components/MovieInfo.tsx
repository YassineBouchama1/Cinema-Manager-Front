import React from 'react';
import { StarIcon } from 'lucide-react';
import { Movie } from '@/types/movie';
import { useSubscriptionContext } from '@/context/user/SubscriptionContext';
import MovieRating from './MovieRating';
import { useAuthContext } from '@/Providers/AuthProvider';
import toast from 'react-hot-toast';
import { useAuthFormContext } from '@/context/AuthFormContext';
import Image from 'next/image';
import { useMovieDetailsStore } from '../store/MovieDetailsStore.user';

// eslint-disable-next-line react/display-name
const MovieInfo = ({ movie }: { movie: Movie }) => {

    const { openModalSwapper, setMovie } = useMovieDetailsStore();
    const { openModalSubscription } = useSubscriptionContext();
    const { openModelAuth, setAuthFormField } = useAuthFormContext();
    const { session } = useAuthContext();

    const handleShowTimesClick = () => {

        openModalSwapper('showtimes');

    };



    // when user try 
    const handleStreamingClick = () => {
        if (!session?.token) {
            setAuthFormField('login');
            openModelAuth();
            toast.error('You should be logged in to Watch Movie Stream');
            return;
        }
        if (!session?.isSubscribe) {
            openModalSubscription('paymentForm');
            toast.error('You should be Subscribed to Watch Movie Stream');
            return;
        }
        setMovie(movie.name, movie._id)
        openModalSwapper('streaming');
    };

    return (
        <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto py-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative ">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.image}`}
                        alt={movie.name}
                        className="w-full h-[270px] object-cover rounded-md"
                        fill
                    />
                </div>
                <div className="p-6 md:w-3/5 relative flex flex-col md:items-start items-center">
                    <h2 className="text-3xl font-bold mb-4">{movie.name}</h2>
                    <div className="flex items-center mb-4">
                        {movie.hasStream && (
                            <button
                                onClick={handleStreamingClick}
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-2">
                                Watch
                            </button>
                        )}
                        <button
                            onClick={handleShowTimesClick}
                            className="bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            ShowTimes
                        </button>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            <span className="font-bold">{movie.rating?.toFixed(2)}</span>
                            <StarIcon className="inline-block ml-1 text-yellow-400" size={16} />
                        </div>
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            {movie.duration} min
                        </div>

                    </div>

                    <MovieRating movieId={movie._id} initialRating={movie.rating} userRating={movie.userRating} />

                    <p className="text-gray-300 mb-4">{movie.description}</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MovieInfo)