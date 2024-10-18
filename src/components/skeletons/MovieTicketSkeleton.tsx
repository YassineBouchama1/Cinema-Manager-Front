/* eslint-disable jsx-a11y/alt-text */
import { Image } from 'lucide-react';
import React from 'react'

export default function MovieTicketSkeleton() {

    const tabs = [
        {
            name: 'tab1',
            label: 'My Tickets',
            render: () => <p>dff</p>
        },
        {
            name: 'tab2',
            label: 'Setting',
            render: () => (
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita in non earum natus explicabo est aspernatur porro molestias fugiat eaque dignissimos, accusantium qui fugit praesentium ad cumque dolore temporibus excepturi.</p>
            )
        },
        {
            name: 'tab3',
            label: 'Tab 3',
            render: () => (
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis eos sequi ducimus voluptas, accusamus amet? Ducimus, velit doloremque atque est quidem ullam nisi quod. Aut quisquam ipsa exercitationem mollitia ratione?</p>
            )
        }
    ];



    return (
        <div className="w-full mt-28 px-3 mx-auto bg-gray-900 rounded-lg overflow-hidden flex flex-col p-1.5">
            <div className="flex gap-2.5 p-2.5">
                {tabs.map((tab) => (
                    <div
                        key={tab.name}
                        className={`relative ${tab.name === 'tab1' ? 'text-blue-400' : 'text-gray-700'}`}
                    >
                        <a href='#' className="block px-2.5 py-1.5">
                            {tab.label}
                        </a>

                        {tab.name === 'tab1' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />}
                    </div>
                ))}
            </div>

            <div className="flex-1 p-2.5 mt-10 h-full bg-gray-800 overflow-auto">
                <div className="space-y-4">

                    <div className=" p-4 rounded-lg animate-pulse">
                        <div className="flex space-x-4">
                            <div className="bg-gray-600 md:w-60 w-full text-center animate-pulse flex flex-col items-center ">
                                <div className="flex items bg-gray-600 items-center justify-center rounded-xl w-full h-96 relative overflow-hidden ">
                                    <Image className="w-10 h-10 text-gray-900"  />
                                </div>
                            </div>
                            <div className="w-2/3 space-y-2">

                                <div className="h-4 bg-gray-600 rounded w-32"></div>
                                <div className="h-4 bg-gray-600 rounded w-32"></div>
                                <div className="h-4 bg-gray-600 rounded w-32"></div>
                                <div className="h-4 bg-gray-600 rounded w-32"></div>
                                <div className="h-4 bg-gray-600 rounded w-32"></div>
                                <div className="h-4 bg-gray-600 rounded w-32"></div>
                                <div className="h-32 w-32 bg-gray-600 rounded "></div>

                            </div>
                        </div>
                        <div className="mt-2 mb-4 h-12 bg-gray-600 rounded w-2/3"></div>

                    </div>

                </div>
            </div>
        </div>

    )
}
