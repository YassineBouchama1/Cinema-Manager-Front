import { getReservations } from '@/features/Profile/apis/getReservations';
import ProfileWrapper from '@/features/Profile/components/ProfileWrapper';

import getQueryClient from '@/utils/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react';

export default async function PageProfile() {
    // Pre-fetch reservations on the server
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['reservation-profile'],
        queryFn: getReservations,
    });


    return (
        <>
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Your Movie Ticket
            </h1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProfileWrapper />

            </HydrationBoundary>
        </>
    );
};