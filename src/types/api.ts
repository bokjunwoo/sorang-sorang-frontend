export interface UploadResponse {
    success: boolean;
    message: string;
}

export interface APIResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
