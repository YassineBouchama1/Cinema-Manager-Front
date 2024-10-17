import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/utils/queryClient';
import Hero from '@/components/layouts/Hero';
import Movies from '@/features/Movies/components/Movies';
import { getMovies } from '@/features/Movies/apis/favoriteApi';


export default async function PageDashboard({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {



    // pre fetch movies in server than passed to client
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['movies-user', searchParams],
        queryFn: () => getMovies(searchParams),
    });



    return (
        <>
            <Hero />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Movies />
            </HydrationBoundary>


        </>
    );
}