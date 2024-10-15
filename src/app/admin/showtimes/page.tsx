
import FormShowTime from '@/features/AdminRoom/components/FormShowTime'
import ListShowTimes from '@/features/AdminRoom/components/ListShowTimes'
import React from 'react'

export default function page() {
    return (
        <main className='flex justify-start gap-6 md:flex-row flex-col'>

            <FormShowTime />
            <ListShowTimes />
        </main>
    )
}
