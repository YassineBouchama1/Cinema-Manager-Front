import { Movie } from "@/types/movie";
import customFetch from "@/utils/customFetch";

export interface FavoriteData {
    movieId: string;

}

interface RatingResponse {
    message: string;

}

export async function addFavorite(favoritegData: FavoriteData): Promise<RatingResponse> {
    try {
        return await customFetch<FavoriteData, RatingResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/favorite`,
            {
                method: 'POST',
                data: favoritegData,
            }
        );
    } catch (error) {
        console.error('Rating submission error:', error);
        throw error;
    }
}




interface DeleteResponse {
    message: string;
}
// del
export async function deleteFavorite(movieId: string): Promise<DeleteResponse> {
    try {
        return await customFetch<void, DeleteResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/favorite/${movieId}`,
            {
                method: 'DELETE',

            }
        );
    } catch (error) {
        console.error('Error deleting favorite:', error);
        throw error;
    }
}








interface MovieResponse {
  message: string;
  data?: Movie[];
}
// fetch movies
export const getMovies = async (params?: Record<string, string | string[] | undefined>): Promise<MovieResponse> => {
  try {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return await customFetch<void, MovieResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie?${queryString}`,
      {
        method: 'GET',
      }
    );
  } catch (error) {
    console.error('Get movies error:', error);
    throw error;
  }
};