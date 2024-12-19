export interface AudioData {
    url: string;
    blob: Blob;
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'failed';

export interface SpeechData {
    summary?: string;
    title?: string;
}

export type StoryInfo = {
    id: number;
    region: string;
    name: string;
    gender: string;
    title: string;
    keyword: string;
    description: string;
    fullDescription: string;
    quiz: string;
    options: string[];
    answer: number;
    audioUrl: string;
};
