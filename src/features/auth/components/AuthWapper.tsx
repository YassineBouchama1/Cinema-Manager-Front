'use client'
import React, { useEffect } from 'react';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useAuthFormContext } from '@/context/AuthFormContext';
import Modal from '../../../components/commen/Modal';
import { useSearchParams } from 'next/navigation';
import LoginForm from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';

type AuthFormField = 'login' | 'register' | 'forgotPassword' | 'resetPassword';

const AuthWrapper = () => {
    const {
        isModelAuthOpen,
        closeModelAuth,
        authFormField,
        setAuthFormField,
        openModelAuth
    } = useAuthFormContext();

    const searchParams = useSearchParams();


    // if there is forget query in url wll open forget pasowd form
    useEffect(() => {
        const tokenPass = searchParams.get('tokenPass');

        console.log(tokenPass)
        if (tokenPass) {
            setAuthFormField('resetPassword');
            openModelAuth()
        }
    }, []);

    if (!isModelAuthOpen) return null;



    // rander selected filed
    const renderForm = () => {
        switch (authFormField) {
            case 'login':
                return <LoginForm />;
            case 'register':
                return <RegisterForm />;
            case 'forgotPassword':
                return <ForgotPasswordForm />;
            case 'resetPassword':
                return <ResetPasswordForm />;
            default:
                return <LoginForm />;
        }
    };

    return (
        <Modal isOpen={isModelAuthOpen} onClose={closeModelAuth}>
            {renderForm()}

        </Modal>
    );
};

export default AuthWrapper;