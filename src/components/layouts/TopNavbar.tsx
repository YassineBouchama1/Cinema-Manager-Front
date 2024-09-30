import { Search } from 'lucide-react';

const TopNavbar: React.FC = () => {
    return (
        <header className="bg-white dark:bg-gray-900 shadow-sm">

            <div className=" max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">

                <div className="flex items-center  justify-start">

                    {/* Hamburger button for mobile */}
                    <button
                        className="md:hidden z-50 focus:outline-none"
                    >
                        {/* Simple hamburger icon */}
                        <div className="space-y-1">
                            <span className="block w-6 h-1 bg-gray-800 dark:bg-white"></span>
                            <span className="block w-6 h-1 bg-gray-800 dark:bg-white"></span>
                            <span className="block w-6 h-1 bg-gray-800 dark:bg-white"></span>
                        </div>
                    </button>

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

export default TopNavbar;