import React from 'react'

export default function MovieDetailsSkeleton() {
  return (
    <>
      <div className='flex gap-10 md:flex-row flex-col justify-center h-full items-start'>



        <div className="md:w-1/2 w-full   h-full  self-end flex justify-end">
          <div className="rounded-md  animate-pulse w-full  md:w-72   h-90  overflow-hidden bg-gray-800">

          </div>
        </div>


        <div className='pt-14 md:w-1/2 w-full flex flex-col md:items-start items-center'>

          <div className="mt-2 mb-4 h-10 bg-gray-800 rounded w-60"></div>
          <div className="mt-2 mb-4 h-4 bg-gray-800 rounded w-60"></div>
          <div className="mt-2 mb-4 h-4 bg-gray-800 rounded w-60"></div>
        </div>
      </div>


    </>

  )
}
