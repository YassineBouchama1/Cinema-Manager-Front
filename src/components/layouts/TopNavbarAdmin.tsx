'use client'
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { Menu } from 'lucide-react';

const TopNavbarAdmin: React.FC = () => {

    const { toggleSidebar } = useGlobalTheme();


    return (
        <header className="bg-white dark:bg-gray-900 shadow-sm  w-full">

            <div className=" max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">

                <div className="flex items-center  justify-start">

                    {/* Hamburger Icon visible only on mobile */}
                    <div className="md:hidden ">
                        <button onClick={toggleSidebar}>

                            <Menu size={32} className="text-gray-800 dark:text-white" />
                        </button>
                    </div>

                    <div className=" flex">
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            TV Series
                        </button>
                        <button className="ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Movies
                        </button>
                        <button className="ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Animes
                        </button>
                    </div>
                    {/* <div className="ml-4 flex items-center md:ml-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </header>
    );
};

export default TopNavbarAdmin;