
import FormRoom from '@/features/AdminRoom/components/FormRoom'
import ListRooms from '@/features/AdminRoom/components/ListRooms'
import React from 'react'

export default function page() {
    return (
        <main className='flex justify-start gap-6 md:flex-row flex-col'>

            <FormRoom />
            <ListRooms />
        </main>
    )
}
