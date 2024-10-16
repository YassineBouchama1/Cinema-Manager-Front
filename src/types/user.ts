export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'super';
    isActive: boolean;
    isSubscribe: boolean;
    subscriptionEndDate?: Date;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt?: Date;
    commentCount?: number;
}