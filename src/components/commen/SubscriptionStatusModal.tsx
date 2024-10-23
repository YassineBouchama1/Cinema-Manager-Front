'use client'
import React, { useEffect, useState } from 'react';
import { checkSubscriptionStatus } from '@/utils/subscription';
import Modal from './Modal';

type SubscriptionStatusModalProps = object

const SubscriptionStatusModal: React.FC<SubscriptionStatusModalProps> = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await checkSubscriptionStatus();
                setSubscriptionStatus(data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Failed to fetch subscription status.');
            } finally {
                setLoading(false);
            }
        };

        if (isModalOpen) {
            fetchSubscriptionStatus();
        }
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return (
        <Modal onClose={handleCloseModal} isOpen={isModalOpen}>

            <div className="modal-content">
                <h2>Subscription Status</h2>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {subscriptionStatus && (
                    <div>
                        <p>Active: {subscriptionStatus.isActive ? 'Yes' : 'No'}</p>
                        <p>Subscription End Date: {subscriptionStatus.subscriptionEndDate}</p>
                        <p>Days Remaining: {subscriptionStatus.daysRemaining}</p>
                    </div>
                )}

            </div>
        </Modal>

    );
};

export default SubscriptionStatusModal;