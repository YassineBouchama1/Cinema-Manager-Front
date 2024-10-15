import FormMovie from '@/features/AdminMovie/components/FormMovie'
import ListMovies from '@/features/AdminMovie/components/ListMovies'
import ListRooms from '@/features/AdminRoom/components/ListShowTimes'
import FormRoom from '@/features/AdminShowTime/components/FormRoom'
import React from 'react'

export default function page() {
    return (
        <main className='flex justify-start gap-6 md:flex-row flex-col'>

            <FormRoom />
            <ListRooms />
        </main>
    )
}
