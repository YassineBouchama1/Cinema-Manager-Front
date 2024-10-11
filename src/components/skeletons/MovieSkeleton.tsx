import { Image } from 'lucide-react';
import React from 'react';

const MovieCardSkeleton: React.FC = () => {
    return (
        <>
            <div className='h-[500px] bg-gray-800 animate-pulse w-full mt-10' />

            <div className='flex justify-center gap-3 w-full mt-8 mb-5'>
                <div className=" h-3 bg-gray-800 rounded md:w-36 w-1/3"></div>
                <div className=" h-3 bg-gray-800 rounded md:w-36 w-1/3"></div>

            </div>
            <div className="text-white pt-6 h-full">
                <div className='flex justify-between mb-6 md:flex-row flex-col items-center gap-4 '>
                    <div className='flex justify-start gap-3'>
                        <div className="mt-2 mb-4 h-10 bg-gray-800 rounded md:w-40 w-1/3"></div>
                        <div className="mt-2 mb-4 h-10 bg-gray-800 rounded md:w-40 w-1/3"></div>
                        <div className="mt-2 mb-4 h-10 bg-gray-800 rounded md:w-24 w-1/3"></div>
                    </div>
                    <div className="mt-2 mb-4 h-10 bg-gray-800 rounded md:w-72 w-2/3"></div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Coming Soon</h2>
                    <div className=" flex gap-4 flex-wrap w-full p-4 md:p-2 xl:p-5 justify-start">
                        {Array.from({ length: 4 }).map((_, i) => (

                            <button className="md:w-60 w-full text-center animate-pulse flex flex-col items-center ">
                                <div className="flex items-center justify-center rounded-xl w-full h-96 relative overflow-hidden bg-gray-800">
                                    <Image className="w-10 h-10 text-gray-900" />
                                </div>
                                <div className="mt-2 mb-4 h-4 bg-gray-800 rounded w-3/4"></div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

export default MovieCardSkeleton;
