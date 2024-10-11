import React from 'react';
import { StarIcon, XIcon } from 'lucide-react';

interface MovieCardProps {
    title: string;
    poster: string;
    rating: number;
    year: number;
    duration: string;
    genres: string[];
    description: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
    title,
    poster,
    rating,
    year,
    duration,
    genres,
    description,
}) => {
    return (
        <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                    <img src={poster} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:w-3/5 relative">
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
                        <XIcon size={24} />
                    </button>
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <div className="flex items-center mb-4">
                        <button className="bg-white text-black font-bold py-2 px-4 rounded mr-2">
                            Watch
                        </button>
                        <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Download
                        </button>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            <span className="font-bold">{rating.toFixed(1)}</span>
                            <StarIcon className="inline-block ml-1 text-yellow-400" size={16} />
                        </div>
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            {duration}
                        </div>
                        <div className="bg-gray-800 rounded-full px-3 py-1">
                            {year}
                        </div>
                    </div>
                    <div className="mb-4">
                        <span className="text-yellow-400">★★★★★</span> {genres.join(', ')}
                    </div>
                    <p className="text-gray-300 mb-4">{description}</p>
                </div>
            </div>
        </div>
    );
};

// Dummy data
const dummyMovie: MovieCardProps = {
    title: "Coco",
    poster: "/assets/poster.jpg",
    rating: 8.6,
    year: 2017,
    duration: "1h 45m",
    genres: ["Animation", "Family", "Fantasy"],
    description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer."
};

const MovieCardDemo: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <MovieCard {...dummyMovie} />
        </div>
    );
};

export default MovieCardDemo;