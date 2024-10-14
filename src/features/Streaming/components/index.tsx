'use client';
import { Movie } from '@/types/movie';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { getMovieStream } from '../apis/getMovieStream';
import { useAuthContext } from '@/Providers/AuthProvider';
import { useAuthFormContext } from '@/context/AuthFormContext';
import ReactPlayer from 'react-player';
import { useUserModalSwapperContext } from '@/context/user/UserModalSwapperContext';
export default function MovieStreaming() {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const { openModelAuth } = useAuthFormContext();
    const { currentModalSwapper } = useUserModalSwapperContext();
    const { session } = useAuthContext(); // Bring session containing user info

    // check if id exists
    if (!id) {
        toast.error('Movie ID is required');
        return null; // i  make it null to avoid renderin the component
    }

    // Fetch movie data using React Query
    const { data: streaming, isLoading, error } = useQuery<Movie | any>({
        queryKey: ['movie-stream', id],
        queryFn: () => getMovieStream(id),
        enabled: !!session?.token && currentModalSwapper === 'streaming', // fetch only if there is  token and the streaming modal is open
    });

    // check if user is authenticated and subscribed
    useEffect(() => {
        if (!session?.token) {
            openModelAuth(); // open the authentication modal
            toast.error('You should be logged in to watch the movie');
        }
    }, [session, openModelAuth]); // excute only if includes session and openModelAuth





    // display loader while data is loading
    if (isLoading) {
        return <h2>Loading streaming...</h2>;
    }

    if (error) {
        console.log(error);
        return <div>Error: {(error as Error).message}</div>;
    }

    if (!streaming) {
        return <div>No streaming data available</div>;
    }





    const videoUrl = streaming.video;
    return (
        <section className='flex flex-col items-center'>
            <h2 className="text-xl font-bold">{streaming.name}</h2>
            <div className='flex flex-col items-center mt-5'>

                {videoUrl ? (
                    <ReactPlayer
                        url={`${process.env.NEXT_PUBLIC_IMAGE_URL}${videoUrl}`}
                        controls={true}
                        width="90%"
                        height="auto"
                        playing={true}


                    />
                ) : (
                    <div>No video URL available for this movie.</div>
                )}
            </div>
        </section>
    );
}