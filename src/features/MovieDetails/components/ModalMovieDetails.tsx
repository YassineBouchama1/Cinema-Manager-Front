'use client'
import DragCloseDrawer from '@/components/commen/DragCloseDrawer';
import { useUserModalContext } from '@/context/user/UserModalContext';
import ShowTimeBooking from '@/features/ShowTimeBooking/components';
import React from 'react';

const MovieModal = () => {
    const { isModalOpen, closeModal, currentModal } = useUserModalContext();

    if (!isModalOpen) return null;

    const renderContent = () => {
        switch (currentModal) {
            case 'showtimes':
                return <ShowTimeBooking />;
            case 'streaming':
                return <div>here will display movie.</div>;

            default:
                return null;
        }
    };

    return (
        <DragCloseDrawer isOpen={!!isModalOpen} onClose={closeModal}>
            {renderContent()}
        </DragCloseDrawer>
    );
};

export default MovieModal;