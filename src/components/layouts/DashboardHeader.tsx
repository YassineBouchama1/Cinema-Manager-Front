'use client'
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { BadgeRussianRuble, LogOut, Menu, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DashboardHeader: React.FC = () => {

    const { toggleSidebar } = useGlobalTheme();
    const router = useRouter()

    function onLogout() {
        console.log('logout')
        router.replace('/')

    }

    return (
        <header className="bg-gray-900 md:hidden shadow-lg shadow-blue-900/40  border-gray-200 px-4 min-h-16 lg:px-6 py-2.5  ">
            <nav className="flex  items-center justify-between ">
                <div className="flex items-center justify-start gap-4">
                    {/* Hamburger Icon visible only on mobile */}
                    <div className=" ">
                        <button onClick={toggleSidebar}>

                            <Menu size={32} className=" text-white" />
                        </button>
                    </div>

                </div>

                <div className="flex gap-x-4 items-center">

                    <div className="flex flex-row items-center gap-2 ">
                        <Image
                            className="w-11 h-10 rounded-lg"
                            src={`/assets/avatar.png`}
                            alt={"lang"}
                            width="100"
                            height="100"
                        />

                        <div>
                            <p className="font-semibold">Yassine</p>
                            <p className="text-xs">Admin</p>
                        </div>
                    </div>

                    <button onClick={() => onLogout()}>
                        <LogOut />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default DashboardHeader;