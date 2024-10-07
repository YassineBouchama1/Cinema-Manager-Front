import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import MovieRecommendations from '@/features/MovieRecommendations/components/MovieRecommendations';
import getQueryClient from '@/utils/queryClient';
import WrapperBook from '@/features/MovieBooking/components/WrapperBook';
import { getMovies } from '@/features/MovieRecommendations/apis/getMovies';


export default async function PageDashboard({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {



    // pre fetch movies in server than passed to client
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['movies', searchParams],
        queryFn: () => getMovies(searchParams),
    });



    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MovieRecommendations />
            </HydrationBoundary>

            <WrapperBook />
        </>
    );
}