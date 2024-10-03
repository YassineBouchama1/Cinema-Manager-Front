'use client'
import React, { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { loginUser } from '@/utils/apis/login'
import { useAuthFormContext } from '@/context/AuthFormContext'
import { X } from 'lucide-react'
import { LoginFormData, loginSchema } from '@/validators/auth'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '@/Providers/AuthProvider'

export default function LoginForm() {

    const { closeModelAuth, setAuthFormField } = useAuthFormContext()

    const { setSession } = useAuthContext();


    //setup react hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async (loginData) => {
            toast.success(`Welcome, ${loginData.data.name}!`)
            // setession to provider
            await setSession({
                userId: loginData.data._id,
                name: loginData.data.name,
                email: loginData.data.email,
                role: loginData.data.role,
                isLoggedIn: true,
                token: loginData.token,
            })
            // after login close model
            closeModelAuth()
            console.log(loginData)
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data)
    }



    return (
        <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
            <div className="flex justify-end p-2">
                <button
                    onClick={() => closeModelAuth()}
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
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to our platform
                </h3>
                <div>
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
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
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                        Your password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={() => setAuthFormField('forgotPassword')}
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Lost Password?
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending ? 'Logging in...' : 'Login to your account'}
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{" "}
                    <button
                        onClick={() => setAuthFormField('register')}
                        className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Create account
                    </button>
                </div>
            </form>
        </div >
    )
}