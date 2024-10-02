import { getSession } from '@/lib/getSessions';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';



// types of requests
interface ApiRequestConfig<T = unknown> {
    url: string;
    method: HttpMethod;
    data?: T;
    headers?: Record<string, string>;
    isFormData?: boolean;
}



class ApiError extends Error {
    status: number;
    data: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}


async function api<T = unknown, R = unknown>(config: ApiRequestConfig<T>): Promise<R> {
    const { url, method, data, headers = {}, isFormData = false } = config;
    const session = await getSession();



    // deafult header
    const defaultHeaders: Record<string, string> = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${session?.token || ''}`,
    };


    // if data type is json add json settng to header
    if (!isFormData) {
        defaultHeaders['Content-Type'] = 'application/json';
    }



    const requestHeaders = { ...defaultHeaders, ...headers };

    const fetchOptions: RequestInit = {
        method,
        headers: requestHeaders,
    };


    // if data comes 
    // check if data is formdaa 
    if (data) {
        if (isFormData) {
            if (data instanceof FormData) {
                fetchOptions.body = data;
            } else {
                throw new Error('Data must be an instance of FormData when isFormData is true');
            }
        } else {
            fetchOptions.body = JSON.stringify(data);
        }
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            errorData = await response.text();
        }
        throw new ApiError(errorData.message || 'An error occurred', response.status, errorData);
    }

    return response.json();
}

export default api;