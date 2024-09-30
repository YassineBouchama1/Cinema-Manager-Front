import { ReactNode } from 'react';

export default function MarginWidthWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col  lg:mx-20 m-auto  min-h-screen">
            {children}
        </div>
    );
}
