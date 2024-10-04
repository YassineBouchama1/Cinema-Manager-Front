export interface ValidationError {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

export interface BackendError {
    errors?: ValidationError[];
    status?: string;
    error?: {
        statusCode: number;
        status: string;
        isOperational: boolean;
    };
    message?: string;
}