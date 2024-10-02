import React from 'react';

const MovieCardSkeleton: React.FC = () => {
    return (

        <div className=" text-white min-h-screen  pt-6">

            <div className="">
                <h2 className=" text-2xl font-bold mb-4 text-gray-400 ">You may also like</h2>
                <div className="group flex space-x-4 overflow-x-auto pb-4 flex-wrap w-full">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white p-4 h-full rounded-2xl shadow-lg flex flex-col gap-5 select-none"
                        >
                            <div className="h-full w-72 rounded-xl bg-gray-200 animate-pulse" />
                            <div className="flex flex-col flex-1 gap-5 p-2">
                                <div className="flex flex-1 flex-col gap-3">
                                    <div className="bg-gray-200 w-full animate-pulse h-80 rounded-2xl" />
                                    <div className="flex flex-col gap-3">
                                        <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
                                        <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
                                    </div>
                                </div>
                                <div className="bg-gray-200 w-full h-8 animate-pulse rounded-full" />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
