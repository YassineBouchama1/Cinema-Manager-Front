'use client';
import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Lock, Edit, Trash, Loader } from 'lucide-react';
import { IUser } from '@/types/user';
import { updateUserAdmin } from '../apis/updateUserAdmin';
import { useUserAdminDashStore } from '../store/showTimeFormStore';

// Type for data update
export type UpdateData = {
    isActive?: boolean;
    isDeleted?: boolean;
}

interface UsersItemProps {
    user: IUser;
}

const UsersItem: React.FC<UsersItemProps> = ({ user }) => {
    const queryClient = useQueryClient();

    // modal user 
    const { openModal, setUserId } = useUserAdminDashStore();



    // Update user mutation
    const mutation = useMutation({
        mutationFn: (updateData: UpdateData) => updateUserAdmin(updateData, user._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users-admin'] });
            toast.success('User updated successfully!');
        },
        onError: (error: { message: string }) => {
            toast.error(`Error updating user: ${error.message}`);
        },
    });

    // Update user status (isActive)
    const onUpdateStatusUser = useCallback(() => {
        const updatedData = {
            isActive: !user.isActive,
        };
        mutation.mutate(updatedData);
    }, [mutation, user.isActive]);

    // Mark user as deleted
    const onDeleteUser = useCallback(() => {
        const updatedData = {
            isDeleted: true,
        };
        mutation.mutate(updatedData);
    }, [mutation]);


    // open page edit
    const onViewUser = useCallback(() => {

        setUserId(user._id)
        openModal('profile')

    }, [user._id]);


    return (
        <tr className="border-t my-3 bg-gray-900 rounded-md border-gray-700">
            <td className="py-2 px-4 truncate max-w-3">{user._id}</td>
            <td className="py-2 px-4">
                <div className="flex items-center">
                    <div>
                        <div>{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                    </div>
                </div>
            </td>

            <td className="py-2 px-4">{user.isSubscribe ? 'Premium' : 'Free'}</td>
            <td className="py-2 px-4">{user.commentCount}</td>

            <td className="py-2 px-4">{user.isActive ? 'Approved' : 'Banned'}</td>
            <td className="py-2 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
            <td className="py-2 px-4">
                <div className="flex space-x-2">
                    <button
                        className="cursor-pointer"
                        onClick={onUpdateStatusUser}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending && mutation.variables?.isActive !== undefined ? (
                            <Loader size={16} className="animate-spin" />
                        ) : (
                            <Lock size={16} className='text-green-700' />
                        )}
                    </button>
                    <button
                        className="cursor-pointer"
                        onClick={() => onViewUser()}
                    >
                        <Edit size={16} className='text-blue-700' />
                    </button>
                    <button
                        className="cursor-pointer"
                        onClick={onDeleteUser}
                        disabled={mutation.isPending}
                        style={{ opacity: mutation.isPending ? 0.4 : 1 }}
                    >
                        {mutation.isPending && mutation.variables?.isDeleted ? (
                            <Loader size={16} className="animate-spin" />
                        ) : (
                            <Trash size={16} className='text-red-700' />
                        )}
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default React.memo(UsersItem);