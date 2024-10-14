'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';

type FormInputs = {
    title: string;
    description: string;
    releaseYear: number;
    runningTime: number;
    quality: 'FullHD' | '4K' | '8K';
    age: string;
    country: string;
    genre: string;
    itemType: 'Movie' | 'TV Show';
};

const MediaForm: React.FC = () => {
    const { register, handleSubmit } = useForm<FormInputs>();
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [photos, setPhotos] = useState<File[]>([]);
    const [video, setVideo] = useState<File | null>(null);
    const [videoLink, setVideoLink] = useState('');

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data, coverImage, photos, video, videoLink);
        // Handle form submission
    };

    const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[90%] mx-auto p-4 sm:p-6 bg-white text-gray-800 shadow-lg rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                    <div
                        className="aspect-[190/270] w-full  mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer overflow-hidden"
                        onClick={() => document.getElementById('coverImageInput')?.click()}
                    >
                        {coverImage ? (
                            <div className="relative w-full h-full">
                                <Image src={coverImage} alt="Cover" layout="fill" objectFit="cover" />
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
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <input {...register('title')} placeholder="Title" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <textarea {...register('description')} placeholder="Description" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4}></textarea>

                    <input {...register('genre')} placeholder="Choose genre / genres" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <div className="flex items-center space-x-4">
                        <input type="file" multiple onChange={(e) => setPhotos(Array.from(e.target.files || []))} className="hidden" id="photosUpload" />
                        <label htmlFor="photosUpload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Upload photos</label>
                        <span className="text-gray-600">{photos.length} photo(s) selected</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center"><input type="radio" {...register('itemType')} value="Movie" className="mr-2" /> Movie</label>
                    <label className="flex items-center"><input type="radio" {...register('itemType')} value="TV Show" className="mr-2" /> TV Show</label>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input type="file" onChange={(e) => setVideo(e.target.files?.[0] || null)} className="hidden" id="videoUpload" />
                        <label htmlFor="videoUpload" className="block w-full cursor-pointer bg-gray-100 text-gray-800 p-2 rounded text-center hover:bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">Upload video</label>
                    </div>
                    <div className="flex-1">
                        <input type="url" onChange={(e) => setVideoLink(e.target.value)} placeholder="or add a link" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">PUBLISH</button>
        </form>
    );
};

export default MediaForm;