'use client';
import React, { useMemo } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { IUser } from '@/types/user';
import UsersItem from './UsersItem';
import FilterUsers from './FilterUsers';

const ListUsers: React.FC = () => {
    const { users, isLoading, error, isFiltering,
        handleFilter } = useFetchUsers();

    // Memoize the users data for performance
    const usersData = useMemo(() => users?.data || [], [users]);

    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg p-6">
            <FilterUsers isFiltering={isFiltering} onFilter={handleFilter} />
            <div className='shadow-lg shadow-gray-700 bg-blue-900 h-[1px] w-full mb-6' />

            <table className="bg-gray-800  w-full text-sm text-left rtl:text-right text-gray-400 ">
                <thead className="text-xs uppercase  text-white ">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">BASIC INFO</th>

                        <th scope="col" className="px-6 py-3">PRICING PLAN</th>
                        <th scope="col" className="px-6 py-3">COMMENTS</th>

                        <th scope="col" className="px-6 py-3">STATUS</th>
                        <th scope="col" className="px-6 py-3">CREATED DATE</th>
                        <th scope="col" className="px-6 py-3">ACTIONS</th>
                    </tr>
                </thead>
                {isLoading ? (
                    <tbody>Loading...</tbody>
                ) : (
                    <tbody className='mt-4'>
                        {usersData.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center">No user available.</td>
                            </tr>
                        ) : (
                            usersData.map((user: IUser) => (
                                <UsersItem key={user._id} user={user} />
                            ))
                        )}
                    </tbody>
                )}
            </table>

        </div>
    );
};

export default ListUsers;