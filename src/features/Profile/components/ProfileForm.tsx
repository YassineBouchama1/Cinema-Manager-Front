import React from 'react';
import useProfileForm from '../hooks/useProfileForm';
import { Loader } from 'lucide-react';
import { FormField } from '@/components/commen/FormField';

export default function ProfileForm() {
    const {
        profileImage,
        name,
        address,
        password,
        passwordConfirm,
        handleProfileImageChange,
        handleSubmit,
        setName,
        setAddress,
        setPassword,
        setPasswordConfirm,
        email,
        isLoading,
        isError,
        error,
    } = useProfileForm();



    return (
        <section className="py-10 my-auto dark:bg-gray-900">
            <form onSubmit={handleSubmit}>
                {/* Profile Image */}
                {isError && <div>Error: {error?.message}</div>}
                <div className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center">
                    {isLoading ? <div className=" z-40 mx-auto flex bg-gray-900 animate-pulse justify-center items-center w-[141px] h-[141px] text-white rounded-full bg-cover bg-center bg-no-repeat cursor-pointer" >
                        <Loader className='text-white opacity-50 animate-spin' size={50} />
                    </div> : (

                        <div
                            className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat cursor-pointer"
                            onClick={() => document.getElementById('profileImageInput')?.click()}
                            style={{ backgroundImage: `url(${profileImage})`, opacity: isLoading ? 0.3 : 1 }}
                        >

                            <input
                                type="file"
                                id="profileImageInput"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                                className="hidden"
                                disabled={isLoading}
                            />
                        </div>
                    )}
                </div>
                <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                    Upload Profile Image
                </h2>
                <div className="mt-6 flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <FormField
                        title="Name"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        styleInput="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        disabled={isLoading}
                        extraContent={isLoading && <Loader size={20} className="animate-spin absolute right-3 top-3 text-gray-400" />}
                    />
                    <FormField
                        title="Email"
                        id="email"
                        type="text"
                        value={email}
                        disabled
                        styleInput="mt-2 p-4 opacity-65 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    />
                </div>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <FormField
                        title="Address"
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        styleInput="mt-2 p-4 opacity-65 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        disabled={isLoading}
                        extraContent={isLoading && <Loader size={20} className="animate-spin absolute right-3 top-3 text-gray-400" />}
                    />
                </div>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <FormField
                        title="Old Password"
                        id="passwordConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        styleInput="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        disabled={isLoading}
                        extraContent={isLoading && <Loader size={20} className="animate-spin absolute right-3 top-3 text-gray-400" />}
                    />
                    <FormField
                        title="New Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        styleInput="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        disabled={isLoading}
                        extraContent={isLoading && <Loader size={20} className="animate-spin absolute right-3 top-3 text-gray-400" />}
                    />
                </div>
                <div className="w-full flex justify-center mt-4 text-white text-lg font-semibold">
                    <button type="submit" className="md:w-1/3 w-1/2 p-4 bg-red-500 rounded-lg" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </section>
    );
}