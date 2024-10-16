'use client';
import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Lock, Edit, Trash, Loader } from 'lucide-react';
import { IUser } from '@/types/user';
import { updateUserAdmin } from '../apis/updateUserAdmin';

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

    // Update user mutation
    const mutation = useMutation({
        mutationFn: (updateData: UpdateData) => updateUserAdmin(updateData, user._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users-admin'] });
            toast.success('User updated successfully!');
        },
        onError: (error: any) => {
            toast.error(`Error updating user: ${error.message}`);
        },
    });

    // Update user status (isActive)
    const onUpdateStatusUser = useCallback(() => {
        const updatedData = {
            isActive: !user.isActive,
        };
        mutation.mutate(updatedData);
    }, [mutation, user.isActive, user._id]);

    // Mark user as deleted
    const onDeleteUser = useCallback(() => {
        const updatedData = {
            isDeleted: true,
        };
        mutation.mutate(updatedData);
    }, [mutation]);

    return (
        <tr className="border-t bg-gray-800 rounded-md border-gray-700">
            <td className="py-2 px-4">{user._id}</td> {/* ID Column */}
            <td className="py-2 px-4">
                <div className="flex items-center">
                    <div>
                        <div>{user.name}</div>
                        <div className="text-gray-500">{user.email}</div> {/* Email Column */}
                    </div>
                </div>
            </td>

            <td className="py-2 px-4">{user.isSubscribe ? 'Premium' : 'Free'}</td> {/* Pricing Plan Column */}
            <td className="py-2 px-4">{user.commentCount}</td> {/* Comments Column */}

            <td className="py-2 px-4">{user.isActive ? 'Approved' : 'Banned'}</td> {/* Status Column */}
            <td className="py-2 px-4">{new Date(user.createdAt).toLocaleDateString()}</td> {/* Created Date Column */}
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
                            <Lock size={16} />
                        )}
                    </button>
                    <button
                        className="cursor-pointer"
                        onClick={() => console.log('Edit user')}
                    >
                        <Edit size={16} />
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
                            <Trash size={16} />
                        )}
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default React.memo(UsersItem);