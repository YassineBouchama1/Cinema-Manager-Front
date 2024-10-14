import React from 'react';
import { StarIcon } from 'lucide-react';
import { Movie } from '@/types/movie';
import { useUserModalSwapperContext } from '@/context/user/UserModalSwapperContext';
import { useSubscriptionContext } from '@/context/user/SubscriptionContext';
import MovieRating from './MovieRating';
import { useAuthContext } from '@/Providers/AuthProvider';
import toast from 'react-hot-toast';
import { useAuthFormContext } from '@/context/AuthFormContext';

const MovieInfo: React.FC<Movie> = React.memo(({
    _id,
    name,
    image,
    rating = 0,
    year = 2017,
    duration,
    genres,
    userRating,
    description = "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    trailerUrl = "https://www.youtube.com/watch?v=Ga6RYejo6Hk",
    hasStream
}) => {
    const { openModalSwapper } = useUserModalSwapperContext();
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
        openModalSwapper('streaming');
    };

    return (
        <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto py-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                    <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
                        alt={name}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="p-6 md:w-3/5 relative flex flex-col md:items-start items-center">
                    <h2 className="text-3xl font-bold mb-4">{name}</h2>
                    <div className="flex items-center mb-4">
                        {hasStream && (
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
                            <span className="font-bold">{rating}</span>
                            <StarIcon className="inline-block ml-1 text-yellow-400" size={16} />
                        </div>
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            {duration} min
                        </div>
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            {year}
                        </div>
                    </div>

                    <MovieRating movieId={_id} initialRating={rating} userRating={userRating} />

                    <p className="text-gray-300 mb-4">{description}</p>
                </div>
            </div>
        </div>
    );
});

export default MovieInfo;