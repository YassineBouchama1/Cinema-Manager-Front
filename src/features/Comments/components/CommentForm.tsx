import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { submitComment } from '../apis/submitComment';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/Providers/AuthProvider';
import { useAuthFormContext } from '@/context/AuthFormContext';

// updated interface to include a property or use unknown
interface CommentFormProps {
    // You can add properties here if needed
}

const CommentForm: React.FC<CommentFormProps> = () => {
    const [comment, setComment] = useState<string>('');

    const { session } = useAuthContext();
    const { openModelAuth, setAuthFormField } = useAuthFormContext();

    const pathname = usePathname();
    const movieId = pathname.split('/').pop();

    // Check if id exists
    if (!movieId) {
        toast.error('Movie ID is required');
    }

    const queryClient = useQueryClient();

    // mutation for submitting the rating
    const mutation = useMutation({
        mutationFn: () => {
            if (!movieId) { // check if movie id exists
                toast.error('Movie ID is required');
                throw new Error('Movie ID is required');
            }
            return submitComment({ movieId, text: comment });
        },
        onSuccess: () => {
            toast.success('Comment Posted successfully!');
            queryClient.invalidateQueries({ queryKey: ['comments-movie'] }); // refresh comments
            setComment(''); // reset comment state after comment submitted
        },
        onError: (error: unknown) => {
            if (error instanceof Error) {
                toast.error(`Error submitting rating: ${error.message}`);
            } else {
                toast.error('An unknown error occurred');
            }
        },
    });

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session?.token) {
            setAuthFormField('login');
            openModelAuth();
            toast.error('You should be logged in to comment on a movie');
            return;
        }

        mutation.mutate();
    }, [session, openModelAuth, setAuthFormField, mutation]); // Removed comment from dependencies

    return (
        <form className="mb-6" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-700 bg-gray-800">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea
                    id="comment"
                    rows={6}
                    className="px-0 w-full text-sm text-white border-0 focus:ring-0 focus:outline-none bg-gray-800 placeholder-gray-400"
                    placeholder="Write a comment..."
                    required
                    value={comment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={mutation.isPending}
                style={{ opacity: mutation.isPending ? 0.4 : 1 }}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-900 hover:bg-red-700"
            >
                {mutation.isPending ? 'Commenting' : 'Comment'}
            </button>
        </form>
    );
};

export default CommentForm;