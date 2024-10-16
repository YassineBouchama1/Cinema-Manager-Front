import { getSession } from "@/lib/sessions";
import { delay } from "@/utils/delay";
import { BackendError } from "@/types/errors";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface CustomFetchOptions<T = unknown> {
  method: HttpMethod;
  data?: T;
  headers?: Record<string, string>;
  useDelay?: boolean;
  delayMs?: number;
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

async function customFetch<T = unknown, R = unknown>(
  url: string,
  options: CustomFetchOptions<T> = { method: 'GET' }
): Promise<R> {
  const {
    method,
    data,
    headers = {},
    useDelay = true,
    delayMs = 2000,
    isFormData = false,
  } = options;

  try {
    if (useDelay) {
      await delay(delayMs);
    }

    const session = await getSession();

    const defaultHeaders: Record<string, string> = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${session?.token || ''}`,
    };


    if (!isFormData) { // if isformdata passed that mean data type is formdata
      defaultHeaders['Content-Type'] = 'application/json';
    }
    const requestHeaders = { ...defaultHeaders, ...headers };

    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (data) {
      if (isFormData) {
        if (data instanceof FormData) {
          fetchOptions.body = data;
          console.log('formdata ')
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

      // Handle specific error cases
      if (errorData.statusCode === 401 && errorData.message === "Your token has expired, please login again") {
        throw new ApiError("Your session has expired. Please log in again.", response.status, errorData);
      }

      const error: BackendError = errorData;
      if (error.errors) {
        const errorMessages = error.errors.map(err => `${err.path}: ${err.msg}`).join(', ');
        throw new ApiError(errorMessages, response.status, errorData);
      } else if (error.message) {
        throw new ApiError(error.message, response.status, errorData);
      } else {
        throw new ApiError('An unexpected error occurred', response.status, errorData);
      }
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}


export default customFetch