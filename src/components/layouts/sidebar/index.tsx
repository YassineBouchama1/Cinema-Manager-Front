'use client'

import { Building2, Film, Home, Image, LayoutDashboard, LucideIcon, Send } from 'lucide-react';
import Link from 'next/link';

import { useGlobalTheme } from '@/context/GlobalThemeContext';
import React, { useMemo } from 'react';
import SidebarItem from './item';

const Sidebar: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useGlobalTheme();



    interface ISidebarItem {
        name: string;
        path: string;
        icon: LucideIcon;

    }



    /// lsit of sidebar itmes
    const items: ISidebarItem[] = useMemo(
        () => [
            {
                name: 'admin',
                path: "/admin",
                icon: LayoutDashboard,

            },
            {
                name: 'movies',
                path: "/admin/movies",
                icon: Send,

            },

        ],
        []
    );

    return (
        <>


            {/* Sidebar */}
            <div className={`w-64 bg-white shadow-lg  p-4 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}>
                <div className="   flex flex-col space-y-10 w-full  h-full">
                    <div className="flex gap-1">

                        <Link
                            className="cursor-pointer text-center w-full"
                            href={'/admin'}>
                            {/* <Image
                                className=" h-10 w-fit "
                                src="/logo.png"
                                alt="Logo"
                                width="100"
                                height="100"
                            /> */}
                            <h2 className='text-3xl font-extrabold'>LOGO</h2>
                        </Link>
                    </div>



                    <div className="flex flex-col space-y-2">
                        {items

                            .map((item, index) => (
                                <SidebarItem key={index} item={item} />
                            ))}
                    </div>

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