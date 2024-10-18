'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import ReactPlayer from 'react-player';
import { useMovieStreaming } from '../hooks/useMovieStreaming';

export default function MovieStreaming() {

    const { videoUrl, isLoading, error, handleReady, handleError, token, movie } = useMovieStreaming();

    return (
        <section className='flex flex-col items-center'>
            <h2 className="text-xl font-bold">{movie?.name}</h2>
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
                                        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
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