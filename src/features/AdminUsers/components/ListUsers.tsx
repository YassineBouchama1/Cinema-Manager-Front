'use client';
import React, { useMemo } from 'react';
import { useUserManagement } from '../hooks/useUserManagement';
import { IUser } from '@/types/user';
import { Lock, Edit, Trash } from 'lucide-react';
import FilterUsers from './FilterUsers';
import DynamicTable from '@/components/commen/DynamicTable';
import { useUserAdminDashStore } from '../store/showTimeFormStore';

const ListUsers: React.FC = () => {
    const {
        users,
        isLoading,
        error,
        refetch,
        updateUserStatus,
        deleteUser,
        mutation,
    } = useUserManagement();


    const { openModal } = useUserAdminDashStore();


    // memoize the users data
    const usersData = useMemo(() => users?.data || [], [users]);

    if (error) return <div>Error: {(error as Error).message}</div>;

    // define columns for the DynamicTable
    const columns = useMemo(() => [
        { header: 'ID', accessor: '_id' },
        { header: 'BASIC INFO', accessor: 'basicInfo' },
        { header: 'PRICING PLAN', accessor: 'pricingPlan' },
        { header: 'COMMENTS', accessor: 'comments' },
        { header: 'STATUS', accessor: 'status' },
        { header: 'CREATED DATE', accessor: 'createdAt' },
    ], []);

    // prepare data for the table
    const tableData = useMemo(() => usersData.map((user: IUser) => ({
        _id: user._id,
        basicInfo: (
            <div>
                <div>{user.name}</div>
                <div className="text-gray-500">{user.email}</div>
            </div>
        ),
        pricingPlan: user.isSubscribe ? 'Premium' : 'Free',
        comments: user.commentCount,
        status: user.isActive ? 'Approved' : 'Banned',
        createdAt: new Date(user.createdAt).toLocaleDateString(),
    })), [usersData]);




    return (
        <div className="w-full relative  p-6">
            <FilterUsers onFilter={refetch} />
            <div className='shadow-lg shadow-gray-700 bg-blue-900 h-[1px] w-full mb-6' />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <DynamicTable
                    columns={columns}
                    data={tableData}
                    actions={(user: IUser) => [
                        {
                            label: <Lock size={16} className='text-green-700' />,
                            onClick: () => updateUserStatus(user),
                            isLoading: mutation.isPending && mutation.variables?.userId === user._id && mutation.variables?.isActive,
                        },
                        {
                            label: <Edit size={16} className='text-blue-700' />,
                            onClick: () => openModal('profile'),
                        },
                        {
                            label: <Trash size={16} className='text-red-700' />,
                            onClick: () => deleteUser(user),
                            isLoading: mutation.isPending && mutation.variables?.userId === user._id && mutation.variables?.isDeleted,
                        },
                    ]}
                />
            )}
        </div>
    );
};

export default ListUsers;