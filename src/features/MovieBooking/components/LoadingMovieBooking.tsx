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

      <div className="mt-2  h-10 bg-gray-800 rounded w-full mb-20"></div>
      <div className='flex gap-4 flex-wrap'>
        {Array(60).fill(0).map((_, i) => (
          <div key={i} className="w-10 h-10 bg-gray-800 rounded hover:bg-gray-600 transition duration-200"></div>
        ))}
      </div>
    </>

  )
}
