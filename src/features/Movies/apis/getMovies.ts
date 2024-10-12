import customFetch from "@/utils/customFetch";

interface MovieResponse {
  message: string;
  data?: any;
}

export const getMovies = async (params?: Record<string, string | string[] | undefined>): Promise<MovieResponse> => {
  try {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return await customFetch<void, MovieResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/movie/public?${queryString}`,
      {
        method: 'GET',
      }
    );
  } catch (error) {
    console.error('Get movies error:', error);
    throw error;
  }
};