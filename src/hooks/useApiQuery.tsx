import { useQuery, useMutation, UseQueryResult, UseMutationResult, QueryKey, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import api from '@/utils/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// interface ApiRequestConfig<T = any> {
//   url: string;
//   method: HttpMethod;
//   data?: T;
//   headers?: Record<string, string>;
//   isFormData?: boolean;
// }

interface UseApiQueryOptions<TData, TError, TVariables> extends Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryFn'> {
    url: string;
    method: HttpMethod;
    data?: TVariables;
    isFormData?: boolean;
}


interface UseApiMutationOptions<TData, TError, TVariables> extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
    url: string;
    method: HttpMethod;
    isFormData?: boolean;
}

function useApiQuery<TData = unknown, TError = Error, TVariables = void>({
    queryKey,
    url,
    method,
    data,
    isFormData = false,
    ...options
}: UseApiQueryOptions<TData, TError, TVariables>): UseQueryResult<TData, TError> {
    return useQuery<TData, TError>({
        queryKey,
        queryFn: () => api<TVariables, TData>({ url, method, data, isFormData }),
        ...options,
    });
}

function useApiMutation<TData = unknown, TError = Error, TVariables = void>({
    url,
    method,
    isFormData = false,
    ...options
}: UseApiMutationOptions<TData, TError, TVariables>): UseMutationResult<TData, TError, TVariables> {
    return useMutation<TData, TError, TVariables>({
        mutationFn: (variables) => api<TVariables, TData>({ url, method, data: variables, isFormData }),
        ...options,
    });
}

export { useApiQuery, useApiMutation };