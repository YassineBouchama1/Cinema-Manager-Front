import React, { useState, useMemo, useCallback } from 'react';
import { StarIcon } from 'lucide-react';
import { useAuthContext } from '@/Providers/AuthProvider';
import { useAuthFormContext } from '@/context/AuthFormContext';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitRating } from '../apis/submitRating';

interface MovieRatingProps {
    movieId: string;
    initialRating: number;
    userRating: number | null | undefined;
}

// eslint-disable-next-line react/display-name
const MovieRating: React.FC<MovieRatingProps> = React.memo(({ movieId, initialRating, userRating }) => {
    const { session } = useAuthContext();
    const { openModelAuth, setAuthFormField } = useAuthFormContext();
    const [movieRating, setMovieRating] = useState<number>(initialRating || 0);
    const [hoverRating, setHoverRating] = useState<number>(userRating ? userRating : 0);
    const queryClient = useQueryClient();

    // Mutation for submitting the rating
    const mutation = useMutation({
        mutationFn: (value: number) => submitRating({ movieId, value }),
        onSuccess: () => {
            toast.success('Rating submitted successfully!');
            queryClient.invalidateQueries({ queryKey: ['movie-details'] });
        },
        onError: (error: { message: string }) => {
            toast.error(`Error submitting rating: ${error.message}`);
        },
    });

    const handleRating = useCallback((index: number) => {
        if (!session?.token) {
            setAuthFormField('login');
            openModelAuth();
            toast.error('You should be logged in to rate a movie');
            return;
        }
        setMovieRating(index); // Set the selected rating
        setHoverRating(index); // Keep the hover rating the same as the selected rating
        mutation.mutate(index);
    }, [session, openModelAuth, setAuthFormField, mutation]);

    const starIcons = useMemo(() => {
        return Array.from({ length: 5 }, (_, index) => {
            index += 1;
            return (
                <StarIcon
                    key={index}
                    size={24}
                    className={`cursor-pointer transition-colors duration-200 ${(hoverRating || movieRating) >= index
                        ? 'text-yellow-400'
                        : 'text-gray-400'
                        }`}
                    onClick={() => handleRating(index)}
                    onMouseEnter={() => setHoverRating(index)}
                    onMouseLeave={() => setHoverRating(movieRating)} // Keep the current rating on mouse leave
                />
            );
        });
    }, [hoverRating, movieRating, handleRating]);

    return (
        <div className="mb-4 flex items-center">
            {starIcons}
            <span className="ml-2">
                {userRating ? `You rated this movie ${userRating} out of 5` : 'Rate this movie'}
            </span>
        </div>
    );
});

export default MovieRating;