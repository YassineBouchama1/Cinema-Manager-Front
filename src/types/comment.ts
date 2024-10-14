export interface Comment {
    id: string;
    name: string;
    avatar: string;
    date: string;
    datetime: string;
    text: string;
}

export interface CommentsResponse {
    data: Comment[];  // Array of comments
}