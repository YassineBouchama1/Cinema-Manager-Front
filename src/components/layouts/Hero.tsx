'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const movies = [
    {
        image: "/images/hero.jpg",
        title: "Joker",
        genres: ["Action", "Action", "Sci-Fi"],
    },
    {
        image: "/images/hero2.jpg",
        title: "Spider Man",
        genres: ["Thriller", "Mystery", "Acton"],
    },
    {
        image: "/images/hero3.jpg",
        title: "One Piece",
        genres: ["Adventure", "Drama", "Anime"],
    },
];

const AUTO_DELAY = 10000;
const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

export default function Hero() {
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        const intervalRef = setInterval(() => {
            setImgIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, []);

    return (
        <section>
            <div className="relative overflow-hidden bg-black/10 bg-blend-multiply rounded-3xl h-[500px] mt-10">
                <motion.div
                    className="flex"
                    animate={{
                        translateX: `-${imgIndex * 100}%`,
                    }}
                    transition={SPRING_OPTIONS}
                    style={{ width: `${movies.length * 100}%` }}
                >
                    {movies.map((movie, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full h-[500px] flex flex-col justify-between"
                            style={{
                                backgroundImage: `url(${movie.image})`,

                                backgroundPosition: "center",
                            }}
                        >
                            <div className="flex -space-x-1 items-center p-4">

                            </div>
                            <div className="bg-gradient-to-r from-black/30 to-transparent p-4">
                                <span className="uppercase text-3xl font-semibold drop-shadow-lg text-white">
                                    {movie.title}
                                </span>
                                <div className="text-xs text-gray-200 mt-2">
                                    {movie.genres.map((genre, index) => (
                                        <span key={index}>
                                            <a href="#" className="text-white">
                                                {genre}
                                            </a>
                                            {index < movie.genres.length - 1 && ', '}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4 flex space-x-3 items-center">
                                    <a
                                        href="#"
                                        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs inline-block text-white"
                                    >
                                        Watch
                                    </a>
                                    <a
                                        href="#"
                                        className="p-2.5 bg-gray-800/80 rounded-lg hover:bg-red-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}