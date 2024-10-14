import React, { useMemo } from 'react';
import Image from 'next/image';
import { Comment } from '@/types/comment';
import { useAuthContext } from '@/Providers/AuthProvider'; // Import the Auth context
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeComment } from '../apis/removeComment';

interface CommentCardProps {
    comments?: Comment[];
}

const CommentCard: React.FC<CommentCardProps> = ({ comments }) => {
    const { session } = useAuthContext();
    const queryClient = useQueryClient();

    // mutation for removing a comment
    const mutation = useMutation({
        mutationFn: (commentId: string) => removeComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments-movie'] });
            toast.success('Comment removed successfully!');
        },
        onError: (error: any) => {
            toast.error(`Error removing comment: ${error.message}`);
        },
    });
    console.log(comments)
    console.log(session)
    // memorize rendered comments to avoid unnecessary recalculations
    const renderedComments = useMemo(() => {

        return comments?.map((comment: Comment) => (
            <article key={comment.id} className="p-6 text-base rounded-lg bg-gray-900 border-t border-gray-700">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
                            <Image
                                className="mr-2 w-6 h-6 rounded-full"
                                src={comment.avatar}
                                alt={comment.name}
                                width={24}
                                height={24}
                            />
                            {comment.name}
                        </p>
                        <p className="text-sm text-gray-400">
                            <time dateTime={comment.datetime} title={comment.datetime}>
                                {comment.date}
                            </time>
                        </p>
                    </div>


                    {/* render the Remove button if the comment belongs to the current user */}
                    {session?.userId === comment.userId && (
                        <button
                            disabled={mutation.isPending}
                            style={{ opacity: mutation.isPending ? 0.4 : 1 }}
                            onClick={() => mutation.mutate(comment.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            {mutation.isPending ? 'Removing' : 'Remove'}
                        </button>
                    )}
                </footer>
                <p className="text-gray-400">{comment.text}</p>
            </article>
        ));
    }, [comments, session, mutation]);

    return <>{renderedComments}</>;
};

export default CommentCard;