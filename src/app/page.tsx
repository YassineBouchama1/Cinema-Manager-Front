import React, { useState } from 'react';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';
import MovieRecommendations from '@/components/movie/MovieRecommendations';
import NavBarHome from '@/components/layouts/NavBarHome';
import ShowTimeRecommendations from '@/components/showtime/ShowTimeRecommendations';
import { ShowTime } from '@/types/showTime';
import Sidebar from '@/components/layouts/Sidebar';
import TopNavbar from '@/components/layouts/TopNavbar';

interface Movie {
  id: string;
  title: string;
  image: string;
  genres: string[];
  description: string;
  rating: string;
  language: string;
  dimension: '3D' | '2D';
  duration: string;
  showTimes: {
    date: string;
    times: string[];
  }[];
}

const showTimes: ShowTime[] = [
  {
    id: '1',
    title: 'Inside Out 2',
    image: '/images/poster.jpg',
    genres: ['Animation', 'Comedy', 'Family', 'Adventure'],
    description: 'Riley and Rileys "Inside Out 2" returns to the mind of newly minted teenager Riley, whose Headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sad...',
    rating: 'PG',
    language: 'Eng',
    dimension: '3D',
    duration: '1h 36m',
    showTimes: [
      {
        date: 'Today',
        times: ['15:30', '17:20', '19:40', '21:20']
      },
      {
        date: 'Tomorrow',
        times: ['10:30', '14:30', '17:30', '19:20']
      },
      {
        date: 'Monday 10 July',
        times: ['10:00', '12:20', '14:40', '16:20', '18:30', '19:50', '21:00']
      }
    ]
  },
  {
    id: '2',
    title: 'The Garfield Movie',
    image: '/images/poster.jpg',
    genres: ['Animation', 'Comedy', 'Family', 'Adventure'],
    description: 'Garfield (voiced by Chris Pratt), the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father - scruffy street cat Vic (voic...',
    rating: 'PG',
    language: 'Eng',
    dimension: '3D',
    duration: '1h 41m',
    showTimes: [
      {
        date: 'Today',
        times: ['15:30', '17:20', '19:40', '21:20']
      },
      {
        date: 'Tomorrow',
        times: ['10:30', '12:40', '14:30', '17:30', '19:20']
      },
      {
        date: 'Monday 10 July',
        times: ['10:00', '12:20', '14:40', '16:20', '18:30', '19:50', '21:00']
      }
    ]
  },

];

const MovieListingPage: React.FC = () => {

  return (<>

    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
          <ShowTimeRecommendations showTime={showTimes} />
        </main>
      </div>
    </div>
  </>
  );
};

export default MovieListingPage;