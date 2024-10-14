import React, { useState, useEffect } from 'react';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';

interface MovieDetailProps {
    name: string;
    image: string;
    rate: number | null; // rate can be a number or null
    year?: number;
    duration: string;
    genres: string;
    description?: string;
    trailerUrl?: string;
}

const MovieDetail: React.FC<MovieDetailProps> = ({
    name,
    image,
    rate = 0,
    year = 2017,
    duration,
    genres,
    description = "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    trailerUrl = "https://www.youtube.com/watch?v=Ga6RYejo6Hk",
}) => {



    // initialize userRating with rate prop or 0 if rate is null
    const [userRating, setUserRating] = useState<number>(rate || 0);
    const [hoverRating, setHoverRating] = useState<number>(0);

    // update userRating if rate prop changes
    useEffect(() => {
        setUserRating(rate || 0);
    }, [rate]);

    // function to handle rating click
    const handleRating = (index: number) => {
        setUserRating(index);
        //TODO : Here i wll update movie
    };

    return (
        <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto py-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                    <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
                        alt={name}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="p-6 md:w-3/5 relative flex flex-col md:items-start items-center">
                    <h2 className="text-3xl font-bold mb-4">{name}</h2>
                    <div className="flex items-center mb-4">
                        <Link href={trailerUrl} target='_blank' className="bg-white text-black font-bold py-2 px-4 rounded mr-2">
                            Watch
                        </Link>
                        <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Download
                        </button>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            <span className="font-bold">{rate}</span>
                            <StarIcon className="inline-block ml-1 text-yellow-400" size={16} />
                        </div>
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            {duration} min
                        </div>
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            {year}
                        </div>
                    </div>


                    <div className="mb-4 flex items-center">
                        {Array.from({ length: 5 }, (_, index) => {
                            index += 1;
                            return (
                                <StarIcon
                                    key={index}
                                    size={24}
                                    className={`cursor-pointer transition-colors duration-200 ${(hoverRating || userRating) >= index
                                        ? 'text-yellow-400'
                                        : 'text-gray-400'
                                        }`}
                                    onClick={() => handleRating(index)}
                                    onMouseEnter={() => setHoverRating(index)}
                                    onMouseLeave={() => setHoverRating(0)}
                                />
                            );
                        })}
                        <span className="ml-2">
                            {userRating > 0
                                ? `You rated this movie ${userRating} out of 5`
                                : 'Rate this movie'}
                        </span>
                    </div>
                    <p className="text-gray-300 mb-4">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;