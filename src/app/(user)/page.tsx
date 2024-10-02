import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import MovieRecommendations from '@/components/movie/MovieRecommendations';
import getQueryClient from '@/utils/queryClient';
import { getMovies } from '@/hooks/useMovies';


export default async function PageDashboard({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {


    // const moviesResult = getMovies()

    // pre fetch movies in server than passed to client
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['movies', searchParams],
        queryFn: () => getMovies(searchParams),
    });

    console.count('rander server')

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MovieRecommendations />
        </HydrationBoundary>
    );
}