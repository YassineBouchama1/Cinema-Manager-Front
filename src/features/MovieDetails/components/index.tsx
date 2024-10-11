'use client'
import React from 'react';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import toast from 'react-hot-toast';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';
import LoadingMovieBooking from './LoadingMovieBooking';
import { useMovieBooking } from '../hooks/useMovieBooking';
import MovieDetail from './MovieDetail';
import HomeDisplayWrapper from '@/components/Wrappers/HomeDisplayWrapper';

const MovieBooking: React.FC = () => {
    const { currentMovieId } = useGlobalTheme();


    if (!currentMovieId) return toast.error('id movie required');

    const {
        movieData,
        isLoading,
        error,
    } = useMovieBooking({ currentMovieId });







    if (isLoading) {
        return <LoadingMovieBooking />;
    }

    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

    if (!movieData) {
        return <div>No movie data available</div>;
    }

    return (

        <MarginWidthWrapper>
            <MovieDetail  {...movieData} />

            <HomeDisplayWrapper />
        </MarginWidthWrapper>


    );
};

export default MovieBooking;