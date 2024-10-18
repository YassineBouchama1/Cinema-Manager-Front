import { ReactNode } from 'react';
import MotionWrapper from './MotionWrapper';

export default function MarginWidthWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col md:w-auto w-full lg:mx-20 m-auto  min-h-screen pb-20 no-scrollbar">
            <MotionWrapper>

                {children}
            </MotionWrapper>
        </div>
    );
}
