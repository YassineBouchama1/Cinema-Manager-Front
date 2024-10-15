'use client';
import React from 'react';
import Image from 'next/image';
import useUpdateMovieForm, { UpdateMovieFormInputs } from '../hooks/useUpdateMovieForm';

interface FormUpdateMovieProps {
    initialData: UpdateMovieFormInputs; // Accept initial data for the movie
    onClose: () => void; // Function to close the form
}

const FormUpdateMovie: React.FC<FormUpdateMovieProps> = ({ initialData, onClose }) => {
    const {
        register,
        handleSubmit,
        errors,
        onSubmit,
        handleCoverImageUpload,
        coverImage,
        setVideo,
        setVideoLink,
        isLoading
    } = useUpdateMovieForm(initialData);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[90%] mx-auto sm:p-6 text-gray-800">
            <div className="flex justify-start gap-6 items-start md:flex-row flex-col w-full">
                <div className="col-span-1 flex h-auto bg-white shadow-lg rounded-lg p-4 justify-center w-full">
                    <div
                        className="h-[350px] w-[220px] mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer overflow-hidden"
                        onClick={() => document.getElementById('coverImageInput')?.click()}
                    >
                        {coverImage ? (
                            <div className="relative w-full h-full">
                                <Image src={URL.createObjectURL(coverImage)} alt="Cover" layout="fill" objectFit="cover" />
                            </div>
                        ) : (
                            <div className="text-center p-4">
                                <p>Upload cover</p>
                                <p className="text-sm text-gray-500">(190 x 270)</p>
                            </div>
                        )}
                        <input
                            id="coverImageInput"
                            type="file"
                            onChange={handleCoverImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                </div>
                <div className="col-span-2 md:col-span-2 w-full space-y-4 bg-white shadow-lg rounded-lg p-4">
                    <input {...register('title')} placeholder="Title" className="w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                    <textarea {...register('description')} placeholder="Description" className="w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4}></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    <div className='flex justify-start gap-x-3 w-full'>
                        <div className='w-full'>
                            <input {...register('genre')} placeholder="Choose genre / genres" className="w-full p-2 border bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
                        </div>

                        <div className='w-full'>
                            <input {...register('duration', { valueAsNumber: true })} type='number' placeholder="Choose duration Movie" className="w-full p-2 border bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input type="file" onChange={(e) => setVideo(e.target.files?.[0] || null)} className="hidden" id="videoUpload" />
                            <label htmlFor="videoUpload" className="block w-full cursor-pointer bg-gray-100 text-gray-800 p-2 rounded text-center hover:bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">Upload video</label>
                        </div>
                        <div className="flex-1">
                            <input type="url" onChange={(e) => setVideoLink(e.target.value)} placeholder="or add a link" className="w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        style={{ opacity: isLoading ? 0.4 : 1 }}
                        className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        {isLoading ? "Updating" : "Update"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-2 w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormUpdateMovie;