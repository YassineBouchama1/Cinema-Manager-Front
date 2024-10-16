import FormMovie from '@/features/AdminMovie/components/FormMovie'
import ListMovies from '@/features/AdminMovie/components/ListMovies'
import React from 'react'

export default function page() {
    return (
        <div>

            <FormMovie />
            <div className='shadow-lg shadow-gray-700 bg-blue-900/70 h-[1px] w-full my-6' />
            <ListMovies />
        </div >
    )
}
