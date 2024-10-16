'use clieny'
import { useQuery } from '@tanstack/react-query';
import { getReservationsAdmin } from '../apis/getReservationsAdmin';


export const useFetchReservations = () => {

    const { data: reservations, isLoading, error } = useQuery({
        queryKey: ['reservations-admin'],
        queryFn: () => getReservationsAdmin(),
    });


    return {
        reservations, isLoading, error
    };
};