'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getfavorites } from '../apis/fetchFavorites';
import { FavoriteType } from '@/types/favorite';
import MovieFavoriteCard from './MovieFavoriteCard';

const ListMovieFavorite: React.FC = () => {



    // fetching list of favorites
    const { data, isLoading, error } = useQuery({
        queryKey: ['favorite-profile'],
        queryFn: getfavorites,

    });




    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (


        <section className="movie-tickets-list  flex flex-wrap gap-5">
            {data && data?.data?.map((favorite: FavoriteType) => (
                <MovieFavoriteCard key={favorite.id} favorite={favorite} />
            ))}
        </section>

    );
};

export default ListMovieFavorite;