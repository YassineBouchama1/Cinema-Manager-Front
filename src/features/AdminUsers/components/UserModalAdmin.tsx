'use client'
import DragCloseDrawer from '@/components/commen/DragCloseDrawer';

import React from 'react';
import { useUserAdminDashStore } from '../store/showTimeFormStore';

const UserModalAdmin = () => {
    const { isModalOpen, closeModal, currentModal, userId } = useUserAdminDashStore();

    if (!isModalOpen) return null;

    const renderContent = () => {
        switch (currentModal) {
            case 'profile':
                return <p>hello {userId} profile</p>;
            case 'comment':
                return <p>comments user</p>;

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

export default UserModalAdmin;