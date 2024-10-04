'use client'
import React, { useState } from 'react';
import ListMovieTickets from './ListMovieTickets';

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
        <div className="w-full">
            <div className="relative  w-full md:mx-auto m-4 ">
                <ul
                    className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-gray-800"
                    data-tabs="tabs"
                    role="list"
                >
                    <li className="z-30 flex-auto text-center w-1/3">
                        <a
                            className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${activeTab === 'reservations' ? 'bg-white text-slate-700' : 'text-slate-600 bg-inherit'
                                }`}
                            onClick={() => setActiveTab('reservations')}
                            role="tab"
                            aria-selected={activeTab === 'reservations'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-4 h-4 mr-1.5 text-slate-500"
                            >
                                <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z"></path>
                                <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z"></path>
                                <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z"></path>
                            </svg>
                            <span className="ml-1">My Reservations</span>
                        </a>
                    </li>
                    <li className="z-30 flex-auto text-center w-1/3">
                        <a
                            className={`z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer ${activeTab === 'profile' ? 'bg-white text-slate-700' : 'text-slate-600 bg-inherit'
                                }`}
                            onClick={() => setActiveTab('profile')}
                            role="tab"
                            aria-selected={activeTab === 'profile'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-4 h-4 mr-1.5 text-slate-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="ml-1">Profile</span>
                        </a>
                    </li>
                    <li className="z-30 flex-auto text-center w-1/3">
                        <a
                            className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer ${activeTab === 'settings' ? 'bg-white text-slate-700' : 'text-slate-600 bg-inherit'
                                }`}
                            onClick={() => setActiveTab('settings')}
                            role="tab"
                            aria-selected={activeTab === 'settings'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-4 h-4 ml-1.5 text-slate-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
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