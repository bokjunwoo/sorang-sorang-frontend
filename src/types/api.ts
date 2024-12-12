export interface UploadResponse {
    success: boolean;
    message: string;
    id?: number;
}

export interface APIResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
