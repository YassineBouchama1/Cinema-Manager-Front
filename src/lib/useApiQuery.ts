// hooks/useApiQuery.ts
import { useQuery, useMutation, UseQueryResult, UseMutationResult, QueryKey } from '@tanstack/react-query';
import api from '@/utils/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface UseApiQueryOptions<TData, TError, TVariables> {
    queryKey: QueryKey;
    url: string;
    method: HttpMethod;
    data?: TVariables;
    isFormData?: boolean;
    enabled?: boolean;
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
}

function useApiQuery<TData = unknown, TError = Error, TVariables = any>({
    queryKey,
    url,
    method,
    data,
    isFormData = false,
    enabled = true,
    onSuccess,
    onError,
}: UseApiQueryOptions<TData, TError, TVariables>): UseQueryResult<TData, TError> | UseMutationResult<TData, TError, TVariables> {
    const fetchData = async (variables?: TVariables): Promise<TData> => {
        return api<TVariables, TData>({
            url,
            method,
            data: variables || data,
            isFormData,
        });
    };

    if (method === 'GET') {
        return useQuery<TData, TError>({
            queryKey,
            queryFn: () => fetchData(),
            enabled,
            onSuccess,
            onError,
        });
    } else {
        return useMutation<TData, TError, TVariables>({
            mutationKey: queryKey,
            mutationFn: fetchData,
            onSuccess,
            onError,
        });
    }
}

export default useApiQuery;