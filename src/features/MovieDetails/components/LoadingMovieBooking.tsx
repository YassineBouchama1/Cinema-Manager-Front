import React from 'react'

export default function LoadingMovieBooking() {
  return (
    <>
      <div className='flex gap-4 md:flex-row flex-col justify-center'>


        <button className="md:w-60 w-full text-center animate-pulse">
          <div className="rounded-xl w-full h-96 relative overflow-hidden bg-gray-800">

          </div>

        </button>

        <div>

          <div className="mt-2 mb-4 h-10 bg-gray-800 rounded w-60"></div>
          <div className="mt-2 mb-4 h-4 bg-gray-800 rounded w-3/4"></div>
        </div>
      </div>

     
    </>

  )
}
