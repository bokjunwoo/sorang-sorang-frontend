'use client'

import { useEffect, useRef, useState } from "react";
import { AudioData, UploadStatus } from "@/types/master";
import { Mic, Square, RotateCcw } from 'lucide-react';
import { uploadSpeech } from "@/lib/api/speech";
import { masterStore } from "@/store/master";
import {useRouter} from "next/navigation";
import SuccessModal from "@/components/common/Modal";

export default function VoiceRecorder() {
    const router = useRouter();
    const masterInfo = masterStore(state => state.masterInfo);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioData, setAudioData] = useState<AudioData | null>(null);
    const [recordingTime, setRecordingTime] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if (audioData?.url) {
                URL.revokeObjectURL(audioData.url);
            }
        };
    }, [audioData?.url]);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setRecordingTime(0);
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                }
            });

            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioData({ url: audioUrl, blob: audioBlob })
                chunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            startTimer();
            setError("");
        } catch (error) {
            setError("마이크 접근 권한이 필요합니다.");
            console.error('Error accessing microphone: ', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
            stopTimer();
        }
    };

    const resetRecording = () => {
        if (audioData?.url) {
            URL.revokeObjectURL(audioData.url);
        }
        setAudioData(null);
        setError("");
    };

    const handleUpload = async () => {
        if (!audioData?.blob) return;

        setUploadStatus('uploading');
        try {
            const formData = new FormData();
            formData.append('name', masterInfo.name);
            formData.append('gender', masterInfo.gender);
            formData.append('number', masterInfo.number);
            formData.append('region', masterInfo.region);
            formData.append('keyword', masterInfo.keyword);
            formData.append('audio', audioData.blob);

            await uploadSpeech(formData);
            setUploadStatus('success');
            setIsModalOpen(true);
        } catch {
            setUploadStatus('failed');
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        router.push('/master'); // 혹은 다음 페이지로 이동
    };

    const getButtonText = (status: UploadStatus) => {
        switch (status) {
            case 'uploading':
                return '전송 중...';
            case 'success':
                return '전송 완료';
            case 'failed':
                return '전송 실패';
            default:
                return '전송하기';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isRecording ? '녹음 중...' : '음성 녹음'}
                    </h1>
                    {isRecording && (
                        <p className="text-xl font-mono text-red-500 mt-2">
                            {formatTime(recordingTime)}
                        </p>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {/* Recording Button */}
                <div className="flex justify-center">
                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                            isRecording
                                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        aria-label={isRecording ? '녹음 중지' : '녹음 시작'}
                    >
                        {isRecording ? (
                            <Square className="w-16 h-16 text-white"/>
                        ) : (
                            <Mic className="w-16 h-16 text-white"/>
                        )}
                    </button>
                </div>

                {/* Audio Player */}
                {audioData && (
                    <div className="space-y-4">
                        <audio
                            controls
                            src={audioData.url}
                            className="w-full"
                            controlsList="noplaybackrate"
                        />
                        <button
                            onClick={resetRecording}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <RotateCcw className="w-5 h-5"/>
                            <span>다시 녹음하기</span>
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={uploadStatus === 'uploading' || uploadStatus === 'success'}
                            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors
                                ${uploadStatus === 'uploading'
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : uploadStatus === 'success'
                                    ? 'bg-green-500'
                                    : uploadStatus === 'failed'
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                } text-white`}
                        >
                            {getButtonText(uploadStatus)}
                        </button>
                    </div>
                )}
            </div>

            {/* Success Modal */}
            {isModalOpen && <SuccessModal onClose={handleModalClose} />}
        </div>
    );
}