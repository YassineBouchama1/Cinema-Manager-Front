import { useEffect, useState } from 'react';
import { useAuthContext } from '@/Providers/AuthProvider';
import { useAuthFormContext } from '@/context/AuthFormContext';
import { useMovieDetailsStore } from '@/features/MovieDetails/store/MovieDetailsStore.user';
import toast from 'react-hot-toast';
interface ReactPlayerError {
    message: string;
    code: number;

}
export const useMovieStreaming = () => {
    const { movie } = useMovieDetailsStore();
    const { openModelAuth } = useAuthFormContext();
    const { session } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!session?.token) {
            openModelAuth();
            toast.error('You should be logged in to watch the movie');
        }
    }, [session, openModelAuth]);

    if (!movie.id) {
        toast.error('Movie ID is required');
        return { isLoading, error: 'Movie ID is required' };
    }

    if (!session?.token) {
        return { isLoading, error: 'User is not authenticated' };
    }

    const videoUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie/stream/${movie.id}`;

    const handleReady = () => {
        setIsLoading(false);
        console.log('Video is ready to play');
    };

    const handleError = (e: ReactPlayerError) => {
        setIsLoading(false);
        setError('Error loading video. Please try again later.');
        console.error('ReactPlayer error:', e);
    };

    return { videoUrl, isLoading, error, handleReady, handleError, token: session.token, movie };
};