
import { MovieData } from '@/types';
import { Category } from '@/types/category';
import { Movie } from '@/types/movie';

export const movieDataFake: MovieData = {
    "data": {
        "_id": "66fd0ba687ea098f50ae9610",
        "name": "Wicked",
        "duration": "150",
        "cinemaId": "66fd038d87ea098f50ae95ed",
        "category": "horror",
        "image": "/movies/66fd038d87ea098f50ae95ed-1727859621851-79069328.png",
        "isDeleted": false,
        "createdAt": "2024-10-02T09:00:22.019Z",
        "updatedAt": "2024-10-02T09:00:22.019Z",
        "__v": 0
    },
    "showTimes": [
        {
            "_id": "66fd0e2387ea098f50ae964c",
            "price": 180,
            "movieId": "66fd0ba687ea098f50ae9610",
            "cinemaId": "66fd038d87ea098f50ae95ed",
            "roomId": {
                "_id": "66fd0be387ea098f50ae961e",
                "name": "A2",
                "capacity": 40,
                "seatsPerRow": 10
            },
            "startAt": "2024-10-26T01:00:00.000Z",
            "endAt": "2024-10-26T03:40:00.000Z",
            "isDeleted": false,
            "createdAt": "2024-10-02T09:10:59.716Z",
            "updatedAt": "2024-10-02T09:10:59.716Z",
            "__v": 0,
            "reservedSeats": []
        },
        {
            "_id": "66fd0e2787ea098f50ae9651",
            "price": 180,
            "movieId": "66fd0ba687ea098f50ae9610",
            "cinemaId": "66fd038d87ea098f50ae95ed",
            "roomId": {
                "_id": "66fd0be387ea098f50ae961e",
                "name": "A2",
                "capacity": 80,
                "seatsPerRow": 10
            },
            "startAt": "2024-10-26T08:00:00.000Z",
            "endAt": "2024-10-26T10:40:00.000Z",
            "isDeleted": false,
            "createdAt": "2024-10-02T09:11:03.817Z",
            "updatedAt": "2024-10-02T09:11:03.817Z",
            "__v": 0,
            "reservedSeats": []
        },
        {
            "_id": "66fd0e2b87ea098f50ae9656",
            "price": 180,
            "movieId": "66fd0ba687ea098f50ae9610",
            "cinemaId": "66fd038d87ea098f50ae95ed",
            "roomId": {
                "_id": "66fd0be387ea098f50ae961e",
                "name": "A2",
                "capacity": 20,
                "seatsPerRow": 10
            },
            "startAt": "2024-10-22T08:00:00.000Z",
            "endAt": "2024-10-22T10:40:00.000Z",
            "isDeleted": false,
            "createdAt": "2024-10-02T09:11:07.401Z",
            "updatedAt": "2024-10-02T09:11:07.401Z",
            "__v": 0,
            "reservedSeats": [4, 5, 10, 3]
        },
        {
            "_id": "66fd0e2e87ea098f50ae965b",
            "price": 180,
            "movieId": "66fd0ba687ea098f50ae9610",
            "cinemaId": "66fd038d87ea098f50ae95ed",
            "roomId": {
                "_id": "66fd0be387ea098f50ae961e",
                "name": "A2",
                "capacity": 80,
                "seatsPerRow": 10
            },
            "startAt": "2024-10-29T08:00:00.000Z",
            "endAt": "2024-10-29T10:40:00.000Z",
            "isDeleted": false,
            "createdAt": "2024-10-02T09:11:10.676Z",
            "updatedAt": "2024-10-02T09:11:10.676Z",
            "__v": 0,
            "reservedSeats": [9, 8, 80]
        },
        {
            "_id": "66fd0e3287ea098f50ae9660",
            "price": 180,
            "movieId": "66fd0ba687ea098f50ae9610",
            "cinemaId": "66fd038d87ea098f50ae95ed",
            "roomId": {
                "_id": "66fd0be387ea098f50ae961e",
                "name": "A2",
                "capacity": 80,
                "seatsPerRow": 10
            },
            "startAt": "2024-10-06T08:00:00.000Z",
            "endAt": "2024-10-06T10:40:00.000Z",
            "isDeleted": false,
            "createdAt": "2024-10-02T09:11:14.682Z",
            "updatedAt": "2024-10-02T09:11:14.682Z",
            "__v": 0,
            "reservedSeats": []
        }
    ]
}