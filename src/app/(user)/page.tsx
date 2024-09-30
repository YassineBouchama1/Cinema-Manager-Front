import React, { useState } from 'react';

import ShowTimeRecommendations from '@/components/showtime/ShowTimeRecommendations';
import { Movie, ShowTime } from '@/types/showTime';
import Sidebar from '@/components/layouts/Sidebar';
import TopNavbar from '@/components/layouts/TopNavbar';
import CinemaCarousel, { Cinema } from '@/components/cinema/CinemaCarousel';


const movieData: Movie[] = [
    {
        id: '1',
        title: 'Fly Me to the Moon',
        posterUrl: '/images/poster.jpg',
        language: 'Eng',
        ageRating: '12+',
        dimension: '2D',
        duration: '2h 12m'
    },
    {
        id: '2',
        title: 'The Garfield Movie',
        posterUrl: '/images/poster.jpg',
        language: 'Eng',
        ageRating: '0+',
        subtitles: 'TriSub',
        dimension: '3D',
        duration: '1h 41m'
    },
    // ... add more movies
];

;



const cinemas: Cinema[] = [
    { id: 1, name: 'Technology', image: '/images/poster.jpg' },
    { id: 2, name: 'Travel', image: '/images/poster.jpg' },
    { id: 3, name: 'Food', image: '/images/poster.jpg' },
    { id: 1, name: 'Technology', image: '/images/poster.jpg' },
    { id: 2, name: 'Travel', image: '/images/poster.jpg' },
    { id: 3, name: 'Food', image: '/images/poster.jpg' },
    { id: 1, name: 'Technology', image: '/images/poster.jpg' },
    { id: 2, name: 'Travel', image: '/images/poster.jpg' },
    { id: 3, name: 'Food', image: '/images/poster.jpg' },
    { id: 1, name: 'Technology', image: '/images/poster.jpg' },
    { id: 2, name: 'Travel', image: '/images/poster.jpg' },
    { id: 3, name: 'Food', image: '/images/poster.jpg' },

];


export default async function pageDashboard({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {


    console.log(searchParams)


    return (
        <>

            <CinemaCarousel cinemas={cinemas} />
            <ShowTimeRecommendations movies={movieData} />
        </>
    );
};