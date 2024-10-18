/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import { Image } from 'lucide-react'
import React from 'react'

export default function FavoriteMoviesSkeleton() {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-400 md:text-start text-center">Latest Movies</h2>
            <div className=" flex gap-4 flex-wrap w-full p-4 md:p-2 xl:p-5 justify-start">
                {Array.from({ length: 2 }).map((_, i) => (

                    <button key={i} className="md:w-60 w-full text-center animate-pulse flex flex-col items-center ">
                        <div className="flex items-center justify-center rounded-xl w-full h-96 relative overflow-hidden bg-gray-900">
                            <Image className="w-10 h-10 text-gray-800" />
                        </div>

                    </button>
                ))}
            </div>
        </div>
    )
}
