import { getOneMovie } from "@/features/MovieDetails/apis/getOneMovie";
import MovieBooking from "@/features/MovieDetails/components";
import MovieModal from "@/features/MovieDetails/components/ModalMovieDetails";
import getQueryClient from "@/utils/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface PageDashboardProps {
    params: {
        id: string;
    };
}

export default async function PageDashboard({ params }: PageDashboardProps) {
    const { id } = params;

    // Check if the movie ID is provided
    if (!id) {
        return <h2>Movie ID is required</h2>;
    }

    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['movie-details', id], // if id changes, refetch data
        queryFn: () => getOneMovie(id),
    });

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MovieBooking currentMovieId={id} />
            </HydrationBoundary>
            <MovieModal />
        </>
    );
}