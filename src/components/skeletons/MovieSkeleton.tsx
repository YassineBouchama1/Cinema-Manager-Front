import React from 'react';

const MovieCardSkeleton: React.FC = () => {
    return (

        <div className=" text-white min-h-screen  pt-6">

            <div className="">
                <h2 className=" text-2xl font-bold mb-4 text-gray-400 ">You may also like</h2>
                <div className="group flex space-x-4 overflow-x-auto pb-4 flex-wrap w-full">
                    {Array.from({ length: 2 }).map((_, i) => (

                        <button className="md:w-60 w-full text-center animate-pulse">
                            <div className="rounded-xl w-full h-96 relative overflow-hidden bg-gray-200">

                            </div>
                            <div className="mt-2 mb-4 h-4 bg-gray-200 rounded w-3/4"></div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
