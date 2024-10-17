import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { addFavorite, deleteFavorite } from '../apis/favoriteApi';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/Providers/AuthProvider';
import { useAuthFormContext } from '@/context/AuthFormContext';

export default function useFavoriteMovie() {
    const { session } = useAuthContext();
    const { openModelAuth, setAuthFormField } = useAuthFormContext();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: { movieId: string; isFavorite: boolean }) => {

            // if user already favorite movie excute delete api instead user addfavorite
            return data.isFavorite ? deleteFavorite(data.movieId) : addFavorite({ movieId: data.movieId });
        },
        onSuccess: () => {
            // after succeffully mutation 
            toast.success('Favorite status updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['movies-user'] });
        },
        onError: (error: { message: string }) => {
            toast.error(`Error updating favorite status: ${error.message}`);
        },
    });


    // this func handle add or delete favorate
    const handleFavorite = useCallback((movieId: string, isFavorite: boolean) => {
        if (!session?.token) { // check if user already authed 
            setAuthFormField('login');
            openModelAuth();
            toast.error('You should be logged in to change favorite status');
            return;
        }

        mutation.mutate({ movieId, isFavorite });
    }, [session, openModelAuth, setAuthFormField, mutation]);

    return { handleFavorite, isLoading: mutation.isPending };
}