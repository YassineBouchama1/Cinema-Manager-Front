'use client'
import React, { useCallback, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { forgotPassword } from '@/utils/apis/forgotPassword'
import { useAuthFormContext } from '@/context/AuthFormContext'
import { X } from 'lucide-react'

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('')


    const { setAuthFormField, closeModelAuth } = useAuthFormContext()
    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data) => {
            toast.success(data.message || 'Password reset email sent successfully!')
            setEmail('') // clear the email input after successful submion
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        forgotPasswordMutation.mutate(email)
    }, [email])

    
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
                onSubmit={handleSubmit}
            >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Forgot Password
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={forgotPasswordMutation.isPending}
                >
                    {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Remember your password? <button
                        onClick={() => setAuthFormField('login')}
                        className="text-blue-700 hover:underline dark:text-blue-500">Log in</button>
                </div>
            </form>
        </div>
    )
}