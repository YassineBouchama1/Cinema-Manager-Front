import { Category } from "./category";

export interface Movie {
    _id: string;
    name: string;
    duration: number;
    cinemaId: string;
    category: Category;
    image: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
