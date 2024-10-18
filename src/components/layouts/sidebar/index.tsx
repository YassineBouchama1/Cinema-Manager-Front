'use client'

import { Clapperboard, DoorOpen, Film, LayoutDashboard, Loader, LogOut, LucideIcon, Ticket, Tickets, User } from 'lucide-react';
import Link from 'next/link';

import { useGlobalTheme } from '@/context/GlobalThemeContext';
import React, { useMemo } from 'react';
import SidebarItem from './item';
import { useAuthContext } from '@/Providers/AuthProvider';

const Sidebar: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useGlobalTheme();
    const { loading, logout } = useAuthContext()



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
                icon: Clapperboard,

            },
            {
                name: 'rooms',
                path: "/admin/rooms",
                icon: DoorOpen,

            },
            {
                name: 'showtimes',
                path: "/admin/showtimes",
                icon: Ticket,

            },
            {
                name: 'users',
                path: "/admin/users",
                icon: User,

            },
            {
                name: 'reservations',
                path: "/admin/reservations",
                icon: Tickets,

            },

        ],
        []
    );

    return (
        <>


            {/* Sidebar */}
            <div className={`w-64 bg-gray-900 shadow-lg shadow-gray-800  p-4 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}>
                <div className="   flex flex-col space-y-10 w-full  h-full">
                    <div className="flex gap-1">


                        <Link
                            href={'/admin'}
                            className="flex items-center space-x-2">
                            <Film className="w-8 h-8 " />
                            <span className="text-xl  font-bold">Film Reels</span>
                        </Link>
                    </div>



                    <div className="flex flex-col space-y-2">
                        {items

                            .map((item, index) => (
                                <SidebarItem key={index} item={item} />
                            ))}
                    </div>
                    <div className='shadow-lg shadow-gray-700 bg-blue-900/70 h-[1px] w-full my-6' />
                    <div className='flex flex-col space-y-2 h-full justify-end'>

                        <button
                            disabled={loading}
                            onClick={() => logout()}
                            className="flex items-center space-x-2 gap-x-2 cursor-pointer pl-3 justify-self-end">
                            {loading ? <Loader className="animate-spin h-5 w-5 " /> :
                                (
                                    <>
                                        <LogOut size={20} className=" text-white" />
                                        <p className="text-sm font-semibold">Logout </p>
                                    </>

                                )
                            }
                        </button>
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