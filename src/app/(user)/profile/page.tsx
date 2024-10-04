import MovieTicket from '@/features/Profile/components/MovieTicket';
import React from 'react';

const MovieTicketPage: React.FC = () => {
    const fakeMovieData = {
        title: "Inside Out 2",
        genres: ["Animation", "Comedy", "Family", "Adventure"],
        duration: "1h 36m",
        location: "40 Duke Street, London",
        hall: "Cinema Hall N°3",
        date: "Tuesday 23 July, 2024",
        time: "14:30 - 15:40",
        age: "0+",
        row: "4",
        seat: "8",
        price: "$10",
        screen: "3D",
        language: "Eng",
        subtitles: "TH",
        posterUrl: "http://127.0.0.1:4000/movies/66fd038d87ea098f50ae95ed-1727859621851-79069328.png"
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Your Movie Ticket
            </h1 >
            <div className='flex gap-4 justify-start flex-wrap'>

                <MovieTicket {...fakeMovieData} />
                <MovieTicket {...fakeMovieData} />
                <MovieTicket {...fakeMovieData} />
                <MovieTicket {...fakeMovieData} />
                <MovieTicket {...fakeMovieData} />
            </div>
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                    Please present this ticket at the cinema entrance.
                </p>
            </div>
        </>

    );
};

export default MovieTicketPage;