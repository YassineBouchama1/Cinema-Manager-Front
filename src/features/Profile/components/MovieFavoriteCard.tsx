'use client';

import { BookmarkCheck, CirclePlay, Loader, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useState } from 'react';
import { FavoriteType } from '@/types/favorite';
import useFavoriteMovie from '@/features/Movies/hooks/useFavoriteMovie';

interface MovieFavoriteCardProps {
  favorite: FavoriteType;
}

const MovieFavoriteCard: React.FC<MovieFavoriteCardProps> = ({ favorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleFavorite, isLoading } = useFavoriteMovie();


  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleFavorite(favorite.id, true);
  };

  return (
    <Link
      href={`/movie/${favorite.movieId}`}
      className="md:w-52 w-full text-center relative z-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-xl w-full h-72 relative overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${favorite.image}`}
          alt={favorite.name}
          fill
          className={`rounded-xl transition-all duration-300 ${isHovered ? 'filter blur-sm' : ''}`}
        />
        {isHovered && (
          <>
            <div className="absolute top-4 left-2 flex flex-col items-center justify-center bg-gray-800 p-1 rounded-xl z-40">
              {isLoading ?
                <Loader size={20} className='animate-spin' />
                :
                <BookmarkCheck
                  onClick={handleFavoriteClick}
                  size={20}
                  className='text-red-800 hover:text-yellow-600 duration-300 z-30'
                />

              }
            </div>
            <div className="absolute top-4 right-2 flex flex-row items-center justify-center bg-gray-900 p-1 rounded-xl">
              <Star className='text-red-500 z-30 hover:text-yellow-600' size={16} />
              <p className='font-semibold'>{favorite.rating}.0</p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
              <CirclePlay className='opacity-70 hover:text-red-700' size={55} />
            </div>
          </>
        )}
      </div>
      <p className="mt-2 mb-4 text-white">{favorite.name}</p>
    </Link>
  );
}

export default memo(MovieFavoriteCard);