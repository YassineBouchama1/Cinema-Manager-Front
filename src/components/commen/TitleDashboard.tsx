'use client'

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import type { FC } from 'react';

interface TitleDashboardProps { title?: string }

const TitleDashboard: FC<TitleDashboardProps> = () => {


    const sugment = useSelectedLayoutSegment()

    const pathname = usePathname()

    if (pathname.includes("create")) {
        return (
            <div >
                <h2 className='uppercase font-bold text-4xl md:text-start text-center' > create {sugment}</h2>
                <div className='shadow-lg shadow-gray-700 bg-blue-900/45 h-[1px] w-full my-6' />
            </div>

        );
    }
    return (
        <div>
            <h2 className='uppercase font-bold text-4xl md:text-start text-center' >{sugment ? sugment + ' Managment' : 'Dashboard'} </h2>
            <div className='shadow-lg shadow-gray-700 bg-blue-900/45 h-[1px] w-full my-6' />
        </div>
    );
}
export default TitleDashboard;