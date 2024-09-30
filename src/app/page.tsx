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
  // Add more categories here...
];

const MovieListingPage: React.FC = () => {

  return (<>

    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6">
          <CinemaCarousel cinemas={cinemas} />
          <ShowTimeRecommendations movies={movieData} />
        </main>
      </div>
    </div>
  </>
  );
};

export default MovieListingPage;