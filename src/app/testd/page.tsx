import React from 'react';

import api from '@/utils/api';
import MovieRecommendations from '@/components/movie/MovieRecommendations';
import { Movie } from '@/types/movie';






export default async function pageDashboard({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {




    const movies: { data: Movie[] } = await api({
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/movie`,
        method: 'GET',
        isFormData: false
    })
    console.log(searchParams)
    console.log(movies)
    if (!movies.data) return <h2>no movies</h2>

    return (
        <>


            <MovieRecommendations movies={movies.data} />
        </>
    );
};