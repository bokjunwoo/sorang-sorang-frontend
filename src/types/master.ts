export interface AudioData {
    url: string;
    blob: Blob;
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'failed';