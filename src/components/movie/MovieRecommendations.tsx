// src/components/MovieRecommendations.tsx

import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/types/movie';

const movies: Movie[] = [
  {
    title: "Fly Me to the Moon",
    image: "/images/fly-me-to-the-moon.jpg",
    language: "Eng",
    ageRating: "12+",
    dimension: "2D",
    duration: "2h 12m",
    buyTicketsLink: "#"
  },
  {
    title: "The Garfield Movie",
    image: "/images/garfield-movie.jpg",
    language: "Eng",
    ageRating: "0+",
    dimension: "3D",
    duration: "1h 41m",
    buyTicketsLink: "#"
  },
  {
    title: "MaXXXine",
    image: "/images/maxxxine.jpg",
    language: "Eng",
    ageRating: "18+",
    dimension: "2D",
    duration: "1h 44m",
    buyTicketsLink: "#"
  },
  {
    title: "DESPICABLE ME 4",
    image: "/images/despicable-me-4.jpg",
    language: "Eng",
    ageRating: "0+",
    dimension: "3D",
    duration: "1h 44m",
    buyTicketsLink: "#"
  },
];

const MovieRecommendations: React.FC = () => {
  return (
    <div className="bg-black p-6">
      <h2 className="text-white text-2xl font-bold mb-6">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;