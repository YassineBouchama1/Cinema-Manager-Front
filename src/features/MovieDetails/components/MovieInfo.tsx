import React, { useState, useEffect } from 'react';
import { StarIcon } from 'lucide-react';
import { Movie } from '@/types/movie';
import { useAuthContext } from '@/Providers/AuthProvider';
import { useAuthFormContext } from '@/context/AuthFormContext';
import toast from 'react-hot-toast';
import { useUserModalSwapperContext } from '@/context/user/UserModalSwapperContext';
import { useSubscriptionContext } from '@/context/user/SubscriptionContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitRating } from '../apis/submitRating';

const MovieInfo: React.FC<Movie> = ({
    _id,
    name,
    image,
    rating = 0,
    year = 2017,
    duration,
    genres,
    description = "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    trailerUrl = "https://www.youtube.com/watch?v=Ga6RYejo6Hk",
    hasStream
}) => {
    const { openModalSwapper } = useUserModalSwapperContext();
    const { session } = useAuthContext(); // bring session contain user info
    const { openModelAuth, setAuthFormField } = useAuthFormContext();
    const { openModalSubscription } = useSubscriptionContext();

    const [userRating, setUserRating] = useState<number>(rating || 0);
    const [hoverRating, setHoverRating] = useState<number>(0);


    const queryClient = useQueryClient();

    // mutation for submitting the rating
    const mutation = useMutation({
        mutationFn: (value: number) => submitRating({ movieId: _id, value }), // sending movie id and rat value
        onSuccess: () => {
            toast.success('Rating submitted successfully!');
            queryClient.invalidateQueries({ queryKey: ['movie-details'] }); // update movie details after rating

        },
        onError: (error: any) => {
            toast.error(`Error submitting rating: ${error.message}`);
        },
    });

    useEffect(() => {
        setUserRating(rating || 0);
    }, [rating]);

    const handleRating = (index: number) => {
        // check if user submited
        if (!session?.token) {
            setAuthFormField('login');
            openModelAuth();
            toast.error('You should be logged in to rating a movie');
            return;
        }

        setUserRating(index);
        mutation.mutate(index); // submit the rating
    };

    const handleShowTimesClick = () => {
        openModalSwapper('showtimes');
    };

    const handleStreamingClick = () => {
        if (!session?.token) {
            setAuthFormField('login');
            openModelAuth();
            toast.error('You should be logged in to Watch Movie Stream');
            return;
        }
        // check if subscribed
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

                    <div className="mb-4 flex items-center">
                        {Array.from({ length: 5 }, (_, index) => {
                            index += 1;
                            return (
                                <StarIcon
                                    key={index}
                                    size={24}
                                    className={`cursor-pointer transition-colors duration-200 ${(hoverRating || userRating) >= index
                                        ? 'text-yellow-400'
                                        : 'text-gray-400'
                                        }`}
                                    onClick={() => handleRating(index)}
                                    onMouseEnter={() => setHoverRating(index)}
                                    onMouseLeave={() => setHoverRating(0)}

                                />
                            );
                        })}
                        <span className="ml-2">
                            {userRating > 0
                                ? `You rated this movie ${userRating} out of 5`
                                : 'Rate this movie'}
                        </span>
                    </div>
                    <p className="text-gray-300 mb-4">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;