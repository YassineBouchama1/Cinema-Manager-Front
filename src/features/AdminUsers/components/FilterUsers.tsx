'use client';
import { Loader } from 'lucide-react';
import React from 'react';
import { useFilterUsers } from '../hooks/useFilterUsers';

interface FilterUsersProps {
    onFilter: () => void;
}

const FilterUsers: React.FC<FilterUsersProps> = ({ onFilter }) => {
    const { isFiltering, search, setSearch, handleFilter } = useFilterUsers();

    const handleSubmit = () => {

        handleFilter();
        onFilter();
        console.log(isFiltering)
    };

    return (
        <div className="flex justify-start mb-6 md:flex-row flex-col items-center gap-4">


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
                        onClick={handleSubmit}
                        className="absolute inset-y-0 right-0 flex items-center pr-3">

                        {isFiltering ? <Loader className="animate-spin h-5 w-5 " /> : <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>}

                    </button>
                </div>





            </div>

        </div>
    );
};

export default FilterUsers;