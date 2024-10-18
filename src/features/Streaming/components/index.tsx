'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/Providers/AuthProvider';
import { useAuthFormContext } from '@/context/AuthFormContext';
import ReactPlayer from 'react-player';


export default function MovieStreaming() {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const { openModelAuth } = useAuthFormContext();

    const { session } = useAuthContext(); // bring session containing user info

    // check if user is authenticated
    useEffect(() => {
        if (!session?.token) {
            openModelAuth(); // open the authentication modal
            toast.error('You should be logged in to watch the movie');

        }
    }, [session, openModelAuth]);


    // check if id exists
    if (!id) {
        toast.error('Movie ID is required');
        return null; // avoid rendering the component
    }


    if (!session?.token) {
        return null
    }


    // Use My Backend API to get the video URL
    // TODO : Should send token with it
    const videoUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie/stream/${id}`

    return (
        <section className='flex flex-col items-center'>
            <h2 className="text-xl font-bold">{'no name movie'}</h2>
            <div className='flex flex-col items-center mt-5'>
                {videoUrl ? (
                    <ReactPlayer
                        url={videoUrl}
                        controls={true}
                        width="90%"
                        height="auto"
                        playing={true}
                        config={{
                            file: {
                                attributes: {
                                    controlsList: 'nodownload',
                                },
                            },
                        }}
                    />
                ) : (
                    <div>No video URL available for this movie.</div>
                )}
            </div>
        </section>
    );
}