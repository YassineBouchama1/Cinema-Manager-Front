import customFetch from "@/utils/customFetch";

interface ShowTimeResponse {
  message: string;
  data?: any;
}

export const getShowTimes = async (params?: Record<string, string | string[] | undefined>): Promise<ShowTimeResponse> => {
  try {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return await customFetch<void, ShowTimeResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/public/showtime?${queryString}`,
      {
        method: 'GET',
      }
    );
  } catch (error) {
    console.error('Get show times error:', error);
    throw error;
  }
};