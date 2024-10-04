import { useQuery } from '@tanstack/react-query';
import { getMovie } from '@/hooks/useMovies';
import { MovieData } from '@/types';

interface UseMovieDataProps {
    currentMovieId: string | null;
}

export const useMovieData = ({ currentMovieId }: UseMovieDataProps) => {
    return useQuery<MovieData>({
        queryKey: ['movie-booking', currentMovieId],
        queryFn: () => {
            if (typeof currentMovieId === 'string' && currentMovieId) {
                return getMovie(currentMovieId);
            }
            return Promise.reject('No valid movie ID provided');
        },
    });
};