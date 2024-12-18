import {APIResponse, UploadResponse} from "@/types/api";
import {SpeechData} from "@/types/master";

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

export const getSpeechResult = async (id: number): Promise<APIResponse<SpeechData>> => {
    const response = await fetch(`https://sorang.site/api/speech/result/${id}`, {
        method: 'GET',
    });

    if (!response.ok) throw new Error('결과 조회 실패');
    return await response.json();
}