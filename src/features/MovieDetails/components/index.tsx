'use client';
import React from 'react';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';
import MovieDisplayWrapper from '@/components/Wrappers/MovieDisplayWrapper';
import MovieDetailsSkeleton from '../../../components/skeletons/MovieDetailsSkeleton';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/types/movie';
import { getOneMovie } from '../apis/getOneMovie';
import MovieInfo from './MovieInfo';



const MovieDetail: React.FC<{ currentMovieId: string }> = ({ currentMovieId }) => {


    // Fetch movie data using React Query
    const { data: movieData, isLoading, error } = useQuery<Movie | any>({
        queryKey: ['movie-details', currentMovieId], // if id changes, refetch data
        queryFn: () => getOneMovie(currentMovieId),
        enabled: true // Ensure the query runs automatically
    });

    // Display loader while data is loading
    if (isLoading) {
        return <MovieDetailsSkeleton />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!movieData) {
        return <div>No movie data available</div>;
    }

    return (
        <MarginWidthWrapper>
            <MovieInfo {...movieData} />
            <div className='w-full h-1 shadow-sm shadow-gray-500 bg-gray-800 my-10'></div>
            <MovieDisplayWrapper />
        </MarginWidthWrapper>
    );
};


export default MovieDetail;