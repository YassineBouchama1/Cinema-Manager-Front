import FormCreateMovie from '@/features/AdminMovie/components/FormCreateMovie'
import ListMovies from '@/features/AdminMovie/components/ListMovies'
import React from 'react'

export default function page() {
    return (
        <div>

            <FormCreateMovie />
            <ListMovies />
        </div>
    )
}
