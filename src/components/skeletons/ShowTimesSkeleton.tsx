import React from 'react'

export default function ShowTimesSkeleton() {
  return (
    <>


      <div className="mt-2  h-10 bg-gray-800 rounded w-full mb-20"></div>
      <div className='flex gap-4 flex-wrap'>
        {Array(60).fill(0).map((_, i) => (
          <div key={i} className="w-10 h-10 bg-gray-800 rounded hover:bg-gray-600 transition duration-200"></div>
        ))}
      </div>
    </>

  )
}
