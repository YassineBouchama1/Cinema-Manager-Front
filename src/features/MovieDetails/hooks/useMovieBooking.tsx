'use client'
import { useQuery } from '@tanstack/react-query';
import { MovieData } from '@/types';
import { getOneMovie } from '../apis/getOneMovie';
import { Movie } from '@/types/movie';

// Define the properties expected by the hook
interface UseMovieBookingProps {
  currentMovieId: string | null; // The ID of the current movie, or null if not set
}

// Define the return type of the hook
interface UseMovieBookingReturn {
  movieData: Movie | undefined;
  isLoading: boolean;
  error: unknown;

}

// custom hook to manage movie booking logic 
export const useMovieBooking = ({ currentMovieId }: UseMovieBookingProps): UseMovieBookingReturn => {



  // getch movie data using React Query
  const { data: movieData, isLoading, error } = useQuery({
    queryKey: ['movie-booking', currentMovieId],
    queryFn: () => {

      //  here iam rnsure the movie ID is valid before fetching
      if (typeof currentMovieId === 'string' && currentMovieId) {
        return getOneMovie(currentMovieId);
      }
      return Promise.reject('No valid movie ID provided'); // if there is no id return error
    },
  });





  return {
    movieData,
    isLoading,
    error

  };
};