import React from 'react';
import { StarIcon, Play, XIcon } from 'lucide-react';

interface MovieDetailProps {
    name: string;
    image: string;
    rate: number;
    year?: number;
    duration: string;
    genres: string;
    description?: string;
    trailerUrl?: string;
}

const MovieDetail: React.FC<MovieDetailProps> = ({
    name,
    image,
    rate,
    year = 2017,
    duration,
    genres,
    description = "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    trailerUrl = "https://www.youtube.com/watch?v=Ga6RYejo6Hk",
}) => {
    return (
        <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto py-4 ">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                    <img src={`/images/poster.jpg`} alt={name} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="p-6 md:w-3/5 relative flex flex-col md:items-start items-center">

                    <h2 className="text-3xl font-bold mb-4">{name}</h2>
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
                            <span className="font-bold">{rate?.toFixed(1)}</span>
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
                        <span className="text-yellow-400">★★★★★</span> {genres}
                    </div>
                    <p className="text-gray-300 mb-4">{description}</p>
                </div>
            </div>
        </div>
    );
};



export default MovieDetail;