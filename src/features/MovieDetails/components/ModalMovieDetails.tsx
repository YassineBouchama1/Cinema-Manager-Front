'use client'
import DragCloseDrawer from '@/components/commen/DragCloseDrawer';
import { useUserModalSwapperContext } from '@/context/user/UserModalSwapperContext';
import ShowTimeBooking from '@/features/ShowTimeBooking/components';
import MovieStreaming from '@/features/Streaming/components';
import React from 'react';
import { useMovieDetailsStore } from '../store/MovieDetailsStore.user';

const MovieModal = () => {
    const { isModalSwapperOpen, closeModalSwapper, currentModalSwapper } = useMovieDetailsStore();

    if (!isModalSwapperOpen) return null;

    const renderContent = () => {
        switch (currentModalSwapper) {
            case 'showtimes':
                return <ShowTimeBooking />;
            case 'streaming':
                return <MovieStreaming />;

            default:
                return null;
        }
    };

    return (
        <DragCloseDrawer isOpen={!!isModalSwapperOpen} onClose={closeModalSwapper}>
            {renderContent()}
        </DragCloseDrawer>
    );
};

export default MovieModal;