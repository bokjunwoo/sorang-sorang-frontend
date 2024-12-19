export interface AudioData {
    url: string;
    blob: Blob;
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'failed';

export interface SpeechData {
    audioUrl: string;
    transcription?: string;
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
};

export interface LatestStoryResponse {
    masterName: string;
    masterGender: '할머니' | '할아버지';
}