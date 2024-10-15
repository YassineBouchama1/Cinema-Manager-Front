
import FormShowTime from '@/features/AdminShowTime/components/FormShowTime'
import ListShowTimes from '@/features/AdminShowTime/components/ListShowTimes'
import React from 'react'

export default function page() {
    return (
        <main className='flex justify-start gap-6 md:flex-row flex-col'>

            <FormShowTime />
            <ListShowTimes />
        </main>
    )
}
