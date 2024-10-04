'use client'
import React, { useState } from 'react';
import ListMovieTickets from './ListMovieTickets';
import { ListOrdered, Settings2, User } from 'lucide-react';

// Define the tab components
const reservations = () => <div>Dashboard Content</div>;
const Profile = () => <div>Profile Content</div>;
const Settings = () => <div>Settings Content</div>;

export default function ProfileWrapper() {
    const [activeTab, setActiveTab] = useState('reservations');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'reservations':
                return <ListMovieTickets />;
            case 'profile':
                return <Profile />;
            case 'settings':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full px-3 mx-auto">
            <div className="relative  md:w-1/3 w-svw ">
                <ul
                    className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-gray-800"
                    data-tabs="tabs"
                    role="list"
                >
                    <li className="z-30 flex-auto text-center w-1/3">
                        <a
                            className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${activeTab === 'reservations' ? 'bg-gray-900 text-white' : 'text-slate-600 bg-inherit'
                                }`}
                            onClick={() => setActiveTab('reservations')}
                            role="tab"
                            aria-selected={activeTab === 'reservations'}
                        >
                            <ListOrdered className="w-4 h-4 ml-1.5 text-slate-500" />
                            <span className="ml-1">My Reservations</span>
                        </a>
                    </li>
                    <li className="z-30 flex-auto text-center w-1/3">
                        <a
                            className={`z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer ${activeTab === 'profile' ? 'bg-gray-900 text-white' : 'text-slate-600 bg-inherit'
                                }`}
                            onClick={() => setActiveTab('profile')}
                            role="tab"
                            aria-selected={activeTab === 'profile'}
                        >
                            <User className="w-4 h-4 ml-1.5 text-slate-500" />

                            <span className="ml-1">Profile</span>
                        </a>
                    </li>
                    <li className="z-30 flex-auto text-center w-1/3">
                        <a
                            className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer ${activeTab === 'settings' ? 'bg-gray-900 text-white' : 'text-slate-600 bg-inherit'
                                }`}
                            onClick={() => setActiveTab('settings')}
                            role="tab"
                            aria-selected={activeTab === 'settings'}
                        >
                            <Settings2 className="w-4 h-4 ml-1.5 text-slate-500" />

                            <span className="ml-1">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="mt-4">
                {renderTabContent()}
            </div>
        </div>
    );
}