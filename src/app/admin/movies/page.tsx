import FormMovie from '@/features/AdminMovie/components/FormMovie'
import ListMovies from '@/features/AdminMovie/components/ListMovies'
import React from 'react'

export default function page() {
    return (
        <div>

            <FormMovie />
            <ListMovies />
        </div>
    )
}
