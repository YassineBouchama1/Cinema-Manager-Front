
import ListUsers from '@/features/AdminUsers/components/ListUsers'
import UserModalAdmin from '@/features/AdminUsers/components/UserModalAdmin'
import React from 'react'

export default function page() {
    return (
        <main className='h-full '>

            <ListUsers />
            <UserModalAdmin />
        </main>
    )
}
