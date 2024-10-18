'use client'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { registerUser } from '@/features/auth/apis/Register'
import { useAuthFormContext } from '@/context/AuthFormContext'
import { X } from 'lucide-react'
import { RegisterFormData, registerSchema } from '@/features/auth/validators/auth'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RegisterForm() {
    const { setAuthFormField, closeModelAuth } = useAuthFormContext();


    //setup react hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });


    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success(data.message || 'Registration successful!')
            setAuthFormField('login')  // after register switch them to register page 


        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data)
    }


    return (
        <div className="bg-gray-800 rounded-lg shadow relative">
            <div className="flex justify-end p-2">
                <button
                    onClick={() => closeModelAuth()}
                    type="button"
                    className="text-white bg-transparent  bg-gray-800 hover:text-white"
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
                    Create an account
                </h3>
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-300 block mb-2 ">
                        Your name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="John Doe"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

                </div>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 block mb-2 ">
                        Your email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-300 block mb-2 ">
                        Your password
                    </label>
                    <input
                        type="password"
                        {...register('password')}
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

                </div>
                <div>
                    <label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-300 block mb-2 ">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        {...register('passwordConfirm')}
                        id="passwordConfirm"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                    {errors.passwordConfirm && <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm.message}</p>}

                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-[#3b82f6] hover:bg-[#1557c0] duration-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending ? 'Registering...' : 'Create account'}
                </button>
                <div className="text-sm font-medium text-gray-500 ">
                    Already have an account? <button
                        onClick={() => setAuthFormField('login')}
                        className=" hover:underline text-[#3b82f6] hover:text-[#1557c0] duration-300">Log in</button>
                </div>
            </form>
        </div>
    )
}
