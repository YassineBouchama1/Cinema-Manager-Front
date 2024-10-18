'use client'
import React from 'react';

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