'use client'
import Link from 'next/link';
import React from 'react';

export interface Cinema {
  id: number;
  name: string;
  image: string;
}

interface CinemaCarouselProps {
  cinemas: Cinema[];
}

const CinemaCarousel: React.FC<CinemaCarouselProps> = ({ cinemas }) => {
  return (
    <div className="container mx-auto mb-10 w-full ">
      <h2 className="text-2xl font-bold mb-4 text-gray-400">Cinemas</h2>
      <section className="flex w-full overflow-x-auto space-x-6 no-scrollbar">
        {cinemas.map((cinema) => (
          <Link href={"#"} key={cinema.id} className="p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200 ease-in-out ">

            <div style={{ backgroundImage: `url(${cinema.image})` }} className="w-40 h-40 object-contain rounded-full border-4 border-gray-300">

            </div>

            < p className="mt-2 text-gray-700" > {cinema.name}</p>
          </Link>
        ))
        }
      </section >
    </div >
  );
};

export default CinemaCarousel;
