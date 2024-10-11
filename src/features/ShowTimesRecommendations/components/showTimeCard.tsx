'use client';
import { useGlobalTheme } from '@/context/GlobalThemeContext';
import { MovieHasShowTimes } from '@/types/showTime';
import Image from 'next/image';
import React, { memo } from 'react';

interface ShowTimeCardProps {
    showTime: MovieHasShowTimes;
}

const showTimeCard: React.FC<ShowTimeCardProps> = ({ showTime }) => {
    const { openModel } = useGlobalTheme();

    const onBuyTickets = () => {
        openModel(showTime._id);
    };

    return (
        <button onClick={onBuyTickets} className="md:w-60 w-full text-center">
            <div className="rounded-xl w-full h-96 relative overflow-hidden">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${showTime.image}`}
                    alt={showTime.name}
                    fill
                    className="rounded-xl"
                />
            </div>
            <p className="mt-2 mb-4 text-white">{showTime.name}</p>
        </button>
    );
}

export default memo(showTimeCard);