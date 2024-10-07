'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { forgotPassword } from '@/features/auth/apis/forgotPassword';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/features/auth/validators/auth';
import { useAuthFormContext } from '@/context/AuthFormContext';
import { X } from 'lucide-react';


export default function ForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });


    const { closeModelAuth, setAuthFormField } = useAuthFormContext() // modal form states

    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data) => {
            toast.success(data.message || 'Password reset email sent successfully!');


        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        forgotPasswordMutation.mutate(data.email);
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow relative ">
            <div className="flex justify-end p-2">
                <button
                    onClick={() => closeModelAuth()}
                    type="button"
                    className="text-white bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="authentication-modal"
                >
                    <X size={20} />
                </button>
            </div>
            <form
                className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className="text-xl font-medium text-white ">
                    Forgot Password
                </h3>
                <p className="text-sm text-gray-300 ">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-white block mb-2 dark:text-gray-300">
                        Your email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="bg-gray-50 border border-gray-300 text-gray-800 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="name@company.com"
                        required

                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-[#3b82f6] hover:bg-[#1557c0] duration-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={forgotPasswordMutation.isPending}
                >
                    {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Remember your password? <button
                        onClick={() => setAuthFormField('login')}
                        className="text-[#3b82f6] hover:underline dark:text-blue-500">Log in</button>
                </div>
            </form>
        </div>
    )
}