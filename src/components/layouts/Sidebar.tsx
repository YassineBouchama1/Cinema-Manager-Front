'use client'

import { Home } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import React from 'react';

const Sidebar: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const { isSidebarOpen, toggleSidebar } = useGlobalTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };


    return (

        <>
            <div className={`bg-white dark:bg-gray-900 text-gray-800 dark:text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}>
                <Link href="/" className="flex items-center space-x-2 px-4">
                    <span className="text-2xl font-extrabold">MMovie.</span>
                </Link>
                <nav>
                    <Link href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Home className="inline-block mr-2" size={20} />
                        Home
                    </Link>
                    {/* Add other navigation items similarly */}
                </nav>
                <div className="px-4 mt-auto">
                    <label className="inline-flex items-center cursor-pointer">
                        <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Theme</span>
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={() => toggleTheme()}
                            checked={theme === 'dark'}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>

            </div>

            {/* Overlay to close sidebar on mobile */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>
            )}

        </>
    );
};

export default Sidebar;
