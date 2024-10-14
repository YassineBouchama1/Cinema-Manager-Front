'use client';

import { useState, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Comment, CommentsResponse } from '@/types/comment';
import { getComments } from '../apis/getComments';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

export default function ListComments(): JSX.Element {
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    // Check if id exists
    if (!id) {
        toast.error('Movie ID is required');
    }

    // fetch comments using React Query
    const { data: commentsData, isLoading, error, refetch } = useQuery<CommentsResponse>({
        queryKey: ['comments-movie', id],
        queryFn: () => (id ? getComments(id as string) : Promise.resolve({ data: [] })),
        enabled: !!id // fetch only if id provided
    });

    // i memorized the comments data to avoid unnecessary recalculations
    const comments = useMemo(() => commentsData?.data || [], [commentsData]);





    return (
        <section className="bg-gray-900 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <h2 className="text-lg lg:text-2xl font-bold text-white">
                    Discussion ({comments.length})
                </h2>
                <CommentForm />

                {/* Loading State */}
                {isLoading && <h3 className="text-white">Loading comments...</h3>}

                {/* Error State */}
                {error && <h3 className="text-red-500">Error loading comments: {error.message}</h3>}

                {/* No Comments State */}
                {!isLoading && comments.length === 0 ? (
                    <h2 className="text-white">Become the first person to comment on this movie</h2>
                ) : (
                    <CommentCard comments={comments} />
                )}
            </div>
        </section>
    );
}