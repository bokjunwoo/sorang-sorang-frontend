import {UploadResponse} from "@/types/api";

export const uploadSpeech = async (formData: FormData): Promise<UploadResponse> => {
    const response = await fetch('/api/speech', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) throw new Error('음성 파일 업로드 실패');
    return await response.json();
}