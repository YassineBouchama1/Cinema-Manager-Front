'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/Providers/AuthProvider';
import { useAuthFormContext } from '@/context/AuthFormContext';
import ReactPlayer from 'react-player';

export default function MovieStreaming() {
    const pathname = usePathname();
    const id = pathname.split('/').pop();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { openModelAuth } = useAuthFormContext();
    const { session } = useAuthContext();

    useEffect(() => {
        if (!session?.token) {
            openModelAuth();
            toast.error('You should be logged in to watch the movie');
        }
    }, [session, openModelAuth]);

    if (!id) {
        toast.error('Movie ID is required');
        return null;
    }

    if (!session?.token) {
        return null;
    }

    const videoUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie/stream/${id}`;

    const handleReady = () => {
        setIsLoading(false);
        console.log('Video is ready to play');
    };

    const handleError = (e: any) => {
        setIsLoading(false);
        setError('Error loading video. Please try again later.');
        console.error('ReactPlayer error:', e);
    };

    return (
        <section className='flex flex-col items-center'>
            <h2 className="text-xl font-bold">{'Movie Title'}</h2>
            <div className='flex flex-col items-center mt-5'>
                {isLoading && <div>Loading video...</div>}
                {error && <div className="text-red-500">{error}</div>}
                {videoUrl && (
                    <ReactPlayer
                        url={videoUrl}
                        controls={true}
                        width="90%"
                        height="auto"
                        playing={true}
                        onReady={handleReady}
                        onError={handleError}
                        config={{
                            file: {
                                attributes: {
                                    controlsList: 'nodownload',
                                },
                                forceVideo: true,
                                forceHLS: false,

                                forceFLV: false,
                                hlsOptions: {
                                    xhrSetup: (xhr: XMLHttpRequest, url: string) => {
                                        xhr.setRequestHeader('Authorization', `Bearer ${session.token}`);
                                    },
                                },
                            },
                        }}
                    />
                )}
            </div>
        </section>
    );
}