const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Ensure this is set in your .env file
const BASE_URL = 'https://api.themoviedb.org/3';

export interface MovieTypeTMPD {
    id: number;
    title: string;
    poster_path: string; // TMDb uses this for images
    overview: string; // Add other fields as necessary
    release_date: string; // Add other fields as necessary
}

export const searchMovies = async (query: string): Promise<MovieTypeTMPD[]> => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.results; // Return the list of movies
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error; // Rethrow the error for handling in the component
    }
};