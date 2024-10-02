'use client'
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { Bell, ChevronDown, Film, Menu } from 'lucide-react';

const TopNavbar: React.FC = () => {

    const { toggleSidebar } = useGlobalTheme();


    return (

        <header className="flex justify-between items-center p-4 bg-gray-800">

            <div className="flex items-center space-x-2">
                <Film className="w-8 h-8" />
                <span className="text-xl font-bold">Film Reels</span>
            </div>

            <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 w-1/2">
                <input type="text" placeholder="Search everything" className="bg-transparent w-full focus:outline-none" />
            </div>
            <div className="flex items-center space-x-4">
                <Bell size={24} className="text-gray-400" />
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
        </header>
    );
};

export default TopNavbar;