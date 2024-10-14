import React, { useMemo } from 'react';
import Image from 'next/image';
import { Comment } from '@/types/comment';

interface CommentCardProps {
    comments?: Comment[];
}

const CommentCard: React.FC<CommentCardProps> = ({ comments }) => {


    // use memo for memoize the rendered comments to avoid unnecessary recalculations
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
                </footer>
                <p className="text-gray-400">{comment.text}</p>
            </article>
        ));
    }, [comments]);

    return <>{renderedComments}</>;
};

export default CommentCard;