'use client';

import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/features/auth/apis/resetPassword';
import { X } from 'lucide-react';
import { useAuthFormContext } from '@/context/AuthFormContext';
import { ResetPasswordFormData, resetPasswordSchema } from '@/features/auth/validators/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ResetPasswordForm() {
    const [token, setToken] = useState('');
    const { closeModelAuth, setAuthFormField } = useAuthFormContext();
    const router = useRouter();

    // Get token from URL or other source
    const searchParams = useSearchParams();
    useEffect(() => {
        const tokenFromUrl = searchParams.get('tokenPass');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    // Setup hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    // Mutation for resetting password
    const resetPasswordMutation = useMutation({
        mutationFn: (data: ResetPasswordFormData) => resetPassword(data.password, token),
        onSuccess: (data) => {
            toast.success(data.message || 'Password reset successfully!');

            setAuthFormField('login');


        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        resetPasswordMutation.mutate(data);
    };


    const handleCloseModal = () => {
        closeModelAuth();
        // remove tokenPass from the URL 
        const params = new URLSearchParams(searchParams);
        params.delete('tokenPass');
        router.replace(`?${params.toString()}`, undefined);
    };


    return (
        <div className="bg-gray-800 rounded-lg shadow relative">
            <div className="flex justify-end p-2">
                <button
                    onClick={handleCloseModal}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="authentication-modal"
                >
                    <X size={20} />
                </button>
            </div>
            <form
                className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className="text-xl font-medium text-white">
                    Reset Your Password
                </h3>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-white block mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        {...register('password')}
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-white block mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-[#3b82f6] hover:bg-[#1557c0] duration-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={resetPasswordMutation.isPending}
                >
                    {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}