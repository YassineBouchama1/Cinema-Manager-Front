'use client'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/utils/apis/Register'
import { useAuthContext } from '@/context/AuthContext'

export default function RegisterForm() {
    const { setAuthField } = useAuthContext();


    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success(data.message || 'Registration successful!')
            setAuthField('login')  // after register switch them to register page 


        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        registerMutation.mutate(formData)
    }

    return (
        <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
            <div className="flex justify-end p-2">
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="authentication-modal"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <form
                className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                onSubmit={handleSubmit}
            >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Create an account
                </h3>
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                        Your name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                        Your password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending ? 'Registering...' : 'Create account'}
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Log in</a>
                </div>
            </form>
        </div>
    )
}