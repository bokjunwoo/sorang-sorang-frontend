import {LatestStoryResponse, UploadResponse} from "@/types/api";
import {StoryInfo} from "@/types/story";

export const uploadSpeech = async (formData: FormData): Promise<UploadResponse> => {
    const response = await fetch('https://sorang.site/api/speech', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) throw new Error('음성 파일 업로드 실패');
    return await response.json();
}

export const getSpeechResult = async (id: number): Promise<{ success: boolean; data?: StoryInfo }> => {
    const response = await fetch(`https://sorang.site/api/speech/result/${id}`, {
        method: 'GET',
    });

    if (!response.ok) throw new Error('결과 조회 실패');
    const data = await response.json();
    return { success: true, data };
}

export const getLatestStory = async (): Promise<LatestStoryResponse> => {
    const response = await fetch('https://sorang.site/api/story/latest', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) throw new Error('최신 이야기 조회 실패');
    return await response.json();
}