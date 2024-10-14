import React, { useState, useCallback } from 'react';

interface CommentFormProps {
    onSubmit: (comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
    const [comment, setComment] = useState<string>('');






    //  memoize the handleSubmit function
    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onSubmit(comment);
        setComment(''); //reset commet stats ater comment submited
    }, [comment, onSubmit]);

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
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-900 hover:bg-red-700"
            >
                Post comment
            </button>
        </form>
    );
};

export default CommentForm;