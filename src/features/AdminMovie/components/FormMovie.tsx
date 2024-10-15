'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import useFormMovie from '../hooks/useFormMovie';
import { useMovieFormStore } from '../store/movieFormStore';

const FormMovie: React.FC = () => {
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
    } = useFormMovie();

    const { currentMovie, isUpdateMode, resetForm, setUpdateMode } = useMovieFormStore();

    useEffect(() => {
        if (isUpdateMode && currentMovie) {

            // set the values in the form
            register('name').onChange({ target: { value: currentMovie.name } });
            register('description').onChange({ target: { value: currentMovie.description } });
            register('duration').onChange({ target: { value: currentMovie.duration } });
            register('genre').onChange({ target: { value: currentMovie.genre } });
        }
    }, [currentMovie, isUpdateMode, register]);




    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[90%] mx-auto sm:p-6 text-white">
            <div className="flex justify-start gap-6 items-start md:flex-row flex-col w-full">
                <div className="col-span-1 flex h-auto bg-gray-900 shadow-lg rounded-lg p-4 justify-center w-full">
                    <div
                        className="h-[350px] w-[220px] mx-auto bg-gray-800 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer overflow-hidden"
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

                <div className="col-span-2 md:col-span-2 w-full space-y-4 bg-gray-900 shadow-lg rounded-lg p-4">
                    <input {...register('name')} placeholder="Name" className="w-full p-2 bg-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <textarea {...register('description')} placeholder="Description" className="w-full p-2 bg-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4}></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    <div className='flex justify-start gap-x-3 w-full'>
                        <div className='w-full'>
                            <input {...register('genre')} placeholder="Choose genre / genres" className="w-full p-2 border bg-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
                        </div>

                        <div className='w-full'>
                            <input {...register('duration', { valueAsNumber: true })} type='number' placeholder="Choose duration Movie" className="w-full p-2 border bg-gray-800 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input type="file" onChange={(e) => setVideo(e.target.files?.[0] || null)} className="hidden" id="videoUpload" />
                            <label htmlFor="videoUpload" className="block w-full cursor-pointer bg-gray-800 text-white p-2 rounded text-center hover:bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">Upload video</label>
                        </div>
                        <div className="flex-1">
                            <input type="url" onChange={(e) => setVideoLink(e.target.value)} placeholder="or add a link" className="w-full p-2 bg-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        style={{ opacity: isLoading ? 0.4 : 1 }}
                        className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        {isLoading ? "Creating" : isUpdateMode ? "Update" : "Create"}
                    </button>

                    {isUpdateMode && (<button className='flex justify-center w-full text-sm hover:text-blue-500 duration-300' onClick={() => resetForm()}>switch to mode Create</button>)}
                </div>
            </div>
        </form>
    );
};

export default FormMovie;