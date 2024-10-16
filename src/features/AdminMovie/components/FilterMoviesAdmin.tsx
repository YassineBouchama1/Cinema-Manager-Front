import TitlePage from '@/components/commen/TitleDashboard';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';

interface FilterMoviesAdminProps {
    onFilter: (filters: Record<string, string>) => void;
    isFiltering: boolean
}

const FilterMoviesAdmin: React.FC<FilterMoviesAdminProps> = ({ onFilter, isFiltering }) => {
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
        <div className="flex justify-end mb-6 md:flex-row flex-col items-center gap-4">


            <div className="flex space-x-4">

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

        </div>
    );
}

export default FilterMoviesAdmin;