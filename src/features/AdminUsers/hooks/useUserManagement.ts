import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsersAdmin } from '../apis/getUsersAdmin';
import { updateUserAdmin } from '../apis/updateUserAdmin';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { IUser } from '@/types/user';
import toast from 'react-hot-toast';

export interface UpdateData {
    isActive?: boolean,
    isDeleted?: boolean
}

export const useUserManagement = () => {
    const searchParams = useSearchParams();


    // memoize search parameters to avoid unnecessary recalculations
    const searchParamsMemo = useMemo(() => Object.fromEntries(searchParams), [searchParams]);

    // fetch users with stale time
    const { data: users, isLoading, error, refetch } = useQuery({
        queryKey: ['users-admin'],
        queryFn: () => getUsersAdmin(),
        staleTime: 10000,
    });


    const queryClient = useQueryClient();

    // mutation for updating user
    const mutation = useMutation({
        mutationFn: (updateData: UpdateData & { userId: string }) =>
            updateUserAdmin(updateData, updateData.userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users-admin'] });
            toast.success('User updated successfully!');
        },
        onError: (error: { message: string }) => {
            toast.error(`Error updating user: ${error.message}`);
        },
    });

    // Update user status
    const updateUserStatus = (user: IUser) => {
        const updatedData: UpdateData & { userId: string } = {
            userId: user._id,
            isActive: !user.isActive,
        };
        mutation.mutate(updatedData);
    };

    // Delete user
    const deleteUser = (user: IUser) => {
        const updatedData: UpdateData & { userId: string } = {
            userId: user._id,
            isDeleted: true,
        };
        mutation.mutate(updatedData);
    };

    return {
        users,
        isLoading,
        error,
        refetch,
        updateUserStatus,
        deleteUser,
        mutation,
    };
};