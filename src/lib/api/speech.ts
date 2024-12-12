import {UploadResponse} from "@/types/api";

export const uploadAudio = async (audioBlob: Blob): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    const response = await fetch('/api/speech', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('음성 파일 업로드 실패');
    return await response.json();
}