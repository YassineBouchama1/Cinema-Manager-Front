import { ReactNode } from 'react';

export default function MarginWidthWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col  lg:mx-20 sm:border-r m-auto sm:border-zinc-700 min-h-screen">
            {children}
        </div>
    );
}
