import customFetch from "@/utils/customFetch";


interface StatisticData {
    numberOfCustomers: number,
    numberOfMovies: number,
    numberOfVisits: number,
    timeSpent: number,
    revenue: number,
}

interface StatisticsResponse {
    message: string;
    data: StatisticData;
}

export const fetchStatistics = async (): Promise<StatisticsResponse> => {
    try {
        return await customFetch<void, StatisticsResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/statistics`,
            {
                method: 'GET',
            }
        );
    } catch (error) {
        console.error('Get Statistics error:', error);
        throw error;
    }
};