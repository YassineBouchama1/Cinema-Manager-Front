'use client'

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import type { FC } from 'react';

interface TitlePageProps { title?: string }

const TitlePage: FC<TitlePageProps> = ({ title }) => {


    const sugment = useSelectedLayoutSegment()

    const pathname = usePathname()

    if (pathname.includes("create")) {
        return (
            <h2 className="uppercase font-medium text-xl py-2">
                create {sugment}
            </h2>
        );
    }
    return (
        <h2 className="uppercase font-medium text-xl py-2">
            dashboard {sugment}
        </h2>
    );
}
export default TitlePage;