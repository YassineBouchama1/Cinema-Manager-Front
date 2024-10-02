import { getSession } from "@/lib/getSessions";

interface FetchServerProps {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    body?: Record<string, unknown> | FormData;
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

async function fetchServer({ method = 'GET', url, body }: FetchServerProps): Promise<Response> {
    try {
        const session = await getSession();

        // if (!session?.token) {
        //   throw new ApiError('Unauthorized', 401);
        // }

        const headers: HeadersInit = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.token}`,
        };

        let fetchBody: BodyInit | null = null;

        if (body instanceof FormData) {

            // If it's FormData, don't set Content-Type header, let the browser set it
            fetchBody = body;
        } else if (body) {
            headers['Content-Type'] = 'application/json';
            fetchBody = JSON.stringify(body);
        }

        const response = await fetch(url, {
            method,
            headers,
            body: fetchBody,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(errorData.message || 'An error occurred', response.status, errorData);
        }

        return response;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('An unexpected error occurred', 500);
    }
}

export default fetchServer;