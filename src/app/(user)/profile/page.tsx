/* eslint-disable @typescript-eslint/no-explicit-any */
import { getReservations } from '@/features/Profile/apis/getReservations';
import ProfileWrapper from '@/features/Profile/components/ProfileWrapper';
import getQueryClient from '@/utils/queryClient';
import { updateUserSession } from '@/utils/sessionManager';
import { handleWebhook } from '@/utils/subscription';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react';

export default async function PageProfile({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const sessionId = searchParams?.session_id;
    if (!sessionId || typeof sessionId !== "string") {
        return <p>Error: Something went wrong!</p>;
    }

    let isPaid: boolean = false
    if (sessionId || typeof sessionId === "string") {



        let session: any;

        try {
            session = await handleWebhook(sessionId);
        } catch (error: any) {
            console.log(error.message)
            isPaid = false
        }

        // Check the response from the backend
        if (!session || !session?.received) {
            isPaid = false

        }


        // update  session 
        if (session || session?.received) {
            isPaid = true
            try {
                const updatedSession = await updateUserSession({ isSubscribe: true });
                console.log("Session updated successfully:", updatedSession);
            } catch (error) {
                console.error("Failed to update session in server component:", error);
            }
        }

    }

    // Pre-fetch reservations on the server
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['reservation-profile'],
        queryFn: getReservations,
    });



    return (
        <>
            <div>
                {isPaid && <p>You are Pro user</p>}
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProfileWrapper />
            </HydrationBoundary>
        </>
    );
}