import { Loader } from 'lucide-react';
import React, { useState } from 'react';

interface FilterShowTimeProps {
    onFilter: (filters: Record<string, string>) => void;
    isFiltering: boolean
}

const FilterShowTime: React.FC<FilterShowTimeProps> = ({ onFilter, isFiltering }) => {
    const [genre, setGenre] = useState('');
    const [date, setDate] = useState('');
    const [search, setSearch] = useState('');

    const handleFilter = () => {
        const filters: Record<string, string> = {};
        if (genre) filters.genre = genre;
        if (date) filters.date = date;
        if (search) filters.search = search;
        onFilter(filters);
    };

    return (
        <div className="flex justify-between mb-6 md:flex-row flex-col items-center gap-4">
            <div className="flex space-x-4">
                <div className="relative">
                    <select
                        className="bg-gray-800 text-white py-2 px-4 pr-8 rounded-md appearance-none"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <option value="">Genres</option>
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="horror">Horror</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
                <div className="relative">
                    <input
                        type="date"
                        className="bg-gray-800 text-white py-2 px-4 rounded-md appearance-none"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button
                    className="bg-gray-800 text-white py-2 px-4 rounded-md"
                    onClick={handleFilter}
                >
                    Filter
                </button>
            </div>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for a movie"
                    className="bg-gray-800 text-white py-2 px-4 pr-10 rounded-md w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    disabled={isFiltering}
                    onClick={handleFilter}
                    className="absolute inset-y-0 right-0 flex items-center pr-3">

                    {isFiltering ? <Loader className="animate-spin h-5 w-5 " /> : <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>}

                </button>
            </div>
        </div>
    );
}

export default FilterShowTime;