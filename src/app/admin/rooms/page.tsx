import FormMovie from '@/features/AdminMovie/components/FormMovie'
import ListMovies from '@/features/AdminMovie/components/ListMovies'
import FormRoom from '@/features/AdminRoom/components/FormRoom'
import ListRooms from '@/features/AdminRoom/components/ListRooms'
import React from 'react'

export default function page() {
    return (
        <div>

            <FormRoom />
            <ListRooms />
        </div>
    )
}
