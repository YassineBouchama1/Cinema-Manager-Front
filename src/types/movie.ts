import { Category } from "./category";

// export interface Movie {
//     _id: string;
//     name: string;
//     duration: number;
//     cinemaId: string;
//     description?: string;
//     category: Category;
//     image: string;
//     isDeleted?: boolean;
//     createdAt?: string;
//     updatedAt?: string;
//     __v?: number;
// }

export interface Movie {
    _id: string;
    name: string;
    duration: string;
    cinemaId: string;
    category: string;
    image: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}