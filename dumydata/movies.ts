
import { Category } from '@/types/category';
import { Movie } from '@/types/movie';

export const movies: Movie[] = [
    {
        _id: "64a1fbc1c5b3c6001e8a1b01",
        name: "The Great Adventure",
        duration: 120,
        cinemaId: "64a1c0d7e7a1f5c7c2a1b001",
        category: Category.Action,
        image: "../dumydata/images/DeadpoolWolverine.webp",
        isDeleted: false,
        createdAt: "2024-09-25T10:00:00.000Z",
        updatedAt: "2024-09-25T10:00:00.000Z",
        __v: 0
    },
    {
        _id: "64a1fbc1c5b3c6001e8a1b02",
        name: "Romantic Getaway",
        duration: 90,
        cinemaId: "64a1c0d7e7a1f5c7c2a1b002",
        category: Category.Romance,
        image: "../dumydata/images/Joker  Folie à Deux.webp",
        isDeleted: false,
        createdAt: "2024-09-26T12:00:00.000Z",
        updatedAt: "2024-09-26T12:00:00.000Z",
        __v: 0
    },
    {
        _id: "64a1fbc1c5b3c6001e8a1b03",
        name: "Mystery of the Night",
        duration: 105,
        cinemaId: "64a1c0d7e7a1f5c7c2a1b003",
        category: Category.Thriller,
        image: "../dumydata/images/La La Land.webp",
        isDeleted: false,
        createdAt: "2024-09-27T14:00:00.000Z",
        updatedAt: "2024-09-27T14:00:00.000Z",
        __v: 0
    },
    {
        _id: "64a1fbc1c5b3c6001e8a1b04",
        name: "Future War",
        duration: 130,
        cinemaId: "64a1c0d7e7a1f5c7c2a1b004",
        category: Category.Action,
        image: "../dumydata/images/Nickel Boys.webp",
        isDeleted: false,
        createdAt: "2024-09-28T16:00:00.000Z",
        updatedAt: "2024-09-28T16:00:00.000Z",
        __v: 0
    },
    {
        _id: "64a1fbc1c5b3c6001e8a1b05",
        name: "Laughter Therapy",
        duration: 85,
        cinemaId: "64a1c0d7e7a1f5c7c2a1b005",
        category: Category.Comedy,
        image: "../dumydata/images/Smile 2.webp",
        isDeleted: false,
        createdAt: "2024-09-29T18:00:00.000Z",
        updatedAt: "2024-09-29T18:00:00.000Z",
        __v: 0
    },
    {
        _id: "64a1fbc1c5b3c6001e8a1b06",
        name: "Ancient Legends",
        duration: 140,
        cinemaId: "64a1c0d7e7a1f5c7c2a1b006",
        category: Category.Animation,
        image: "../dumydata/images/Wicked.webp",
        isDeleted: false,
        createdAt: "2024-09-30T20:00:00.000Z",
        updatedAt: "2024-09-30T20:00:00.000Z",
        __v: 0
    }
];
