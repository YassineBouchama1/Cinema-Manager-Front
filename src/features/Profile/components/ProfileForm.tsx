
import React from 'react';
import useProfileForm from '../hooks/useProfileForm';

export default function ProfileForm() {
    const {
        profileImage,
        name,
        address,
        password,
        oldPassword,
        handleProfileImageChange,
        handleSubmit,
        setName,
        setAddress,
        setPassword,
        setOldPassword,
        email,
        isLoading,
        isError,
        error,
    } = useProfileForm();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <section className="py-10 my-auto dark:bg-gray-900">
            <form onSubmit={handleSubmit}>
                {/* Profile Image */}
                <div className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center">
                    <div
                        className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat cursor-pointer"
                        onClick={() => document.getElementById('profileImageInput')?.click()}
                        style={{ backgroundImage: `url(${profileImage})` }}
                    >
                        <input
                            type="file"
                            id="profileImageInput"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="hidden"
                        />
                    </div>
                </div>
                <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                    Upload Profile Image
                </h2>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <div className="w-full mb-4 mt-6">
                        <label htmlFor="name" className="mb-2 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                            placeholder="Name"
                        />
                    </div>
                    <div className="w-full mb-4 lg:mt-6">
                        <label htmlFor="email" className="dark:text-gray-300">Email</label>
                        <input
                            type="text"
                            value={email}
                            disabled
                            className="mt-2 p-4 opacity-65 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        />
                    </div>
                </div>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <div className="w-full">
                        <label htmlFor="address" className="dark:text-gray-300">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-2 p-4 opacity-65 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        />
                    </div>
                </div>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <div className="w-full mb-4 mt-6">
                        <label htmlFor="oldPassword" className="mb-2 dark:text-gray-300">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        />
                    </div>
                    <div className="w-full mb-4 lg:mt-6">
                        <label htmlFor="password" className="dark:text-gray-300">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center mt-4 text-white text-lg font-semibold">
                    <button type="submit" className="md:w-1/3 w-1/2 p-4 bg-red-500 rounded-lg" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </section>
    );
}