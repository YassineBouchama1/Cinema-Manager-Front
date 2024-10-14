'use client';
import React, { useEffect } from 'react';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import toast from 'react-hot-toast';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';
import LoadingMovieBooking from '../../../components/skeletons/MovieDetailsSkeleton';
import MovieDetail from './MovieDetail';
import HomeDisplayWrapper from '@/components/Wrappers/HomeDisplayWrapper';
import MovieDetailsSkeleton from '../../../components/skeletons/MovieDetailsSkeleton';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@/types/movie';
import { getOneMovie } from '../apis/getOneMovie';

const MovieBooking: React.FC<{ currentMovieId: string }> = ({ currentMovieId }) => {
    // Fetch movie data using React Query
    const { data: movieData, isLoading, error } = useQuery<Movie | any>({
        queryKey: ['movie-user', currentMovieId], // if id changes, refetch data
        queryFn: () => getOneMovie(currentMovieId),
        enabled: true // Ensure the query runs automatically
    });

    // Display loader while data is loading
    if (isLoading) {
        return <MovieDetailsSkeleton />;
    }

    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

    if (!movieData) {
        return <div>No movie data available</div>;
    }

    return (
        <MarginWidthWrapper>
            <MovieDetail {...movieData} /> {/* Ensure movieData.data matches MovieDetail props */}
            <HomeDisplayWrapper />
        </MarginWidthWrapper>
    );
};

export default MovieBooking;