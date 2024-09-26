'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import MarginWidthWrapper from '@/components/Wrappers/MarginWidthWrapper';

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

const movies: Movie[] = [
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
  // ... add more movies as needed
];

const MovieListingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Now Playing');

  return (
    <MarginWidthWrapper>

      <div className="bg-black text-white min-h-screen p-6">
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <select className="bg-gray-800 text-white py-2 px-4 pr-8 rounded-md appearance-none">
                <option>Genres</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select className="bg-gray-800 text-white py-2 px-4 pr-8 rounded-md appearance-none">
                <option>Select date</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <button className="bg-gray-800 text-white py-2 px-4 rounded-md">Filter</button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a movie"
              className="bg-gray-800 text-white py-2 px-4 pr-10 rounded-md w-64"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              className={`text-lg font-semibold ${activeTab === 'Now Playing' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('Now Playing')}
            >
              Now Playing
            </button>
            <button
              className={`text-lg font-semibold ${activeTab === 'Coming Soon' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('Coming Soon')}
            >
              Coming Soon
            </button>
          </div>
          <button className="text-purple-500">Reset Filter</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="flex">
                <div className="w-1/3 relative">
                  <Image src={movie.image} alt={movie.title} layout="fill" objectFit="cover" />
                  <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                    {movie.rating}
                  </div>
                </div>
                <div className="w-2/3 p-4">
                  <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-sm text-gray-400 mb-2">Genres: {movie.genres.join(', ')}</p>
                  <p className="text-sm mb-4">{movie.description}</p>
                  <div className="flex space-x-2 mb-4">
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{movie.language}</span>
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{movie.rating}</span>
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{movie.dimension}</span>
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">{movie.duration}</span>
                  </div>
                  <h3 className="font-semibold mb-2">Session Times:</h3>
                  {movie.showTimes.map((showTime, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-sm font-medium">{showTime.date}:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {showTime.times.map((time, timeIndex) => (
                          <span key={timeIndex} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Buy Tickets
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarginWidthWrapper>
  );
};

export default MovieListingPage;