'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getfavorites } from '../apis/fetchFavorites';
import { FavoriteType } from '@/types/favorite';
import MovieFavoriteCard from './MovieFavoriteCard';
import FavoriteMoviesSkeleton from '@/components/skeletons/FavoriteMoviesSkeleton';

const ListMovieFavorite: React.FC = () => {



    // fetching list of favorites
    const { data, isLoading, error } = useQuery({
        queryKey: ['favorite-profile'],
        queryFn: getfavorites,

    });




    if (isLoading) {
        return <FavoriteMoviesSkeleton />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (


        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Favorites Movies</h2>
            <div className=" flex gap-4 flex-wrap w-full p-4 md:p-2 xl:p-5 justify-start">
                {data && data?.data?.map((favorite: FavoriteType) => (
                    <MovieFavoriteCard key={favorite.id} favorite={favorite} />
                ))}
            </div>
        </div>

    );
};

export default ListMovieFavorite;