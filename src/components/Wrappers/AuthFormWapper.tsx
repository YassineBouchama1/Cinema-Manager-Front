'use client'
import React, { useEffect } from 'react';
import RegisterForm from '../../features/auth/components/RegisterForm';
import ForgotPasswordForm from '../../features/auth/components/ForgotPasswordForm';
import Modal from '../commen/Modal';
import { useSearchParams } from 'next/navigation';
import LoginForm from '../../features/auth/components/LoginForm';
import ResetPasswordForm from '../../features/auth/components/ResetPasswordForm';
import { useAuthFormContext } from '@/context/AuthFormContext';

type FormField = 'login' | 'register' | '' | 'resetPassword';

const AuthFormWapper = () => {
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

export default AuthFormWapper;