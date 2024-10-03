'use client'
import { useAuthFormContext } from '@/context/AuthFormContext';
import { Film, User } from 'lucide-react';

const TopNavbar: React.FC = () => {

    const { openModelAuth } = useAuthFormContext();





    return (

        <header className="flex justify-between items-center p-4 bg-gray-800">

            <div className="flex items-center space-x-2">
                <Film className="w-8 h-8" />
                <span className="text-xl font-bold">Film Reels</span>
            </div>

            {/* <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 w-1/2">
                <input type="text" placeholder="Search everything" className="bg-transparent w-full focus:outline-none" />
            </div> */}
            <div className="flex items-center space-x-4">
                {/* <Bell size={24} className="text-gray-400" /> */}
                <button
                    onClick={() => openModelAuth()}
                    className="w-8 h-8 bg-gray-600 rounded-full justify-center items-center flex cursor-pointer">
                    <User size={24} className="text-gray-400" />
                </button>
            </div>
        </header>
    );
};

export default TopNavbar;