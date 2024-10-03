'use client'
import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuthContext } from '@/context/AuthContext';
import Modal from '../commen/Modal';

const AuthWapper = () => {

    const { isModelAuthOpen, closeModelAuth, authField, setAuthField } = useAuthContext();

    if (!isModelAuthOpen) return null;

    return (
        <Modal isOpen={isModelAuthOpen} onClose={closeModelAuth}>
            {authField === 'login' ? (
                <LoginForm />
            ) : (
                <RegisterForm />
            )}
            <button onClick={() => setAuthField(authField === 'login' ? 'register' : 'login')}>
                Switch to {authField === 'login' ? 'Register' : 'Login'}
            </button>
            <button onClick={closeModelAuth}>Close</button>
        </Modal>
    );
};

export default AuthWapper