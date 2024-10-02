import React from 'react';


const FilterMovie: React.FC = () => {


    return (
        <>
            <div className="flex justify-between mb-6  md:flex-row flex-col items-center gap-4">
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


        </>



    );
}

export default FilterMovie;