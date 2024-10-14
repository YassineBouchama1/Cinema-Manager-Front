'use client'
import React, { useEffect } from 'react';
import RegisterForm from '../../features/auth/components/RegisterForm';
import ForgotPasswordForm from '../../features/auth/components/ForgotPasswordForm';
import Modal from '../commen/Modal';
import { useSearchParams } from 'next/navigation';
import LoginForm from '../../features/auth/components/LoginForm';
import ResetPasswordForm from '../../features/auth/components/ResetPasswordForm';
import { useAuthFormContext } from '@/context/AuthFormContext';
import { useSubscriptionContext } from '@/context/user/SubscriptionContext';
import PaymentForm from '@/features/Subscription/components/PaymentForm';
import ModalWide from '../commen/ModalWide';


const SubscriptionWapper = () => {
    const {
        isModalSubscriptionOpen,
        currentModalSubscription
        , closeModalSubscription
    } = useSubscriptionContext();



    // rander selected filed
    const renderForm = () => {
        switch (currentModalSubscription) {
            case 'paymentForm':
                return <PaymentForm />;



            default:
                return <h3>nothing</h3>;
        }
    };

    return (
        <ModalWide isOpen={isModalSubscriptionOpen} onClose={closeModalSubscription}>
            {renderForm()}

        </ModalWide>
    );
};

export default SubscriptionWapper;