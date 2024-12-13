'use client'

import { useEffect, useRef, useState } from "react";
import { AudioData, SpeechData, UploadStatus } from "@/types/master";
// import { getSpeechResult, uploadSpeech } from "@/lib/api/speech";
import { masterStore } from "@/store/master";
import { useRouter } from "next/navigation";
import AudioVisualizer from "@/components/master/AudioVisualizer";
import { Button } from "@/components/common/Button";
import Image from 'next/image';

const MOCK_SPEECH_DATA: SpeechData = {
    audioUrl: "test-url",
    transcription: "할머니가 말씀하신 테스트 내용입니다.",
    title: "애월동 순자의 이야기",
    summary: "옛날 옛적에 작은 마을에 살던 할머니가 들려주신 이야기입니다. 할머니는 어린 시절 마을 앞 강가에서 친구들과 함께 놀았던 추억을 이야기해주셨어요..."
};

export default function VoiceRecorder() {
    const router = useRouter();
    const masterInfo = masterStore(state => state.masterInfo);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioData, setAudioData] = useState<AudioData | null>(null);
    const [recordingTime, setRecordingTime] = useState<number>(0);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
    const [showResult, setShowResult] = useState(false);
    const [speechData, setSpeechData] = useState<SpeechData | null>(null);

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

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, {type: 'audio/webm'});
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioData({url: audioUrl, blob: audioBlob})
                chunksRef.current = [];

                setUploadStatus('uploading');
                setTimeout(() => {
                    setUploadStatus('success');
                    setSpeechData(MOCK_SPEECH_DATA);
                    setShowResult(true);
                }, 3000);

                // try {
                //     const formData = new FormData();
                //     formData.append('name', masterInfo.name);
                //     formData.append('gender', masterInfo.gender);
                //     formData.append('number', masterInfo.number);
                //     formData.append('region', masterInfo.region);
                //     formData.append('keyword', masterInfo.keyword);
                //     formData.append('audio', audioBlob);
                //
                //     const uploadResponse = await uploadSpeech(formData);
                //     if (!uploadResponse.success || !uploadResponse.id) {
                //         throw new Error(uploadResponse.message);
                //     }
                //
                //     const resultResponse = await getSpeechResult(uploadResponse.id);
                //     if (resultResponse.success && resultResponse.data) {
                //         setUploadStatus('success');
                //         setSpeechData(resultResponse.data);
                //
                //         setTimeout(() => {
                //             setShowResult(true);
                //         }, 3000);
                //     } else {
                //         throw new Error('결과 조회 실패');
                //     }
                // } catch (error) {
                //     console.error('Upload or processing failed:', error);
                //     setUploadStatus('failed');
                // }
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            startTimer();
        } catch (error) {
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

    const getDisplayContent = () => {
        if (uploadStatus === 'uploading' && !showResult) {
            return (
                <div className="text-center space-y-4 mt-[120px]">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary2 border-t-transparent mx-auto"/>
                    <p className="font-pretendard text-pretendard-l text-brand-black">
                        정말 재밌는 이야기였어요!<br />
                        잠시만 기다려주세요
                    </p>
                </div>
            );
        }

        if (showResult && speechData) {
            return (
                <>
                    <div className="absolute -top-6 -left-10 -right-10 -bottom-6 bg-brand-bg1"/>

                    {/* Text Area */}
                    <div className="absolute top-[20px] left-0 right-0">
                        <div className="mt-[20px]">
                            <h1 className="font-pretendard text-pretendard-l text-brand-black mt-[80px] text-center">
                                어르신의 소리가 이야기가 되어<br/>아이들에게 전달되었어요
                            </h1>
                            <div className="mt-[60px]">
                                <div className="bg-brand-bg2 rounded-lg p-6">
                                    {speechData.summary && speechData.title && (
                                        <div className="space-y-6">
                                            {/* Region-based Item Image */}
                                            <div className="flex justify-center">
                                                <div className="relative w-28 h-28">
                                                    <Image
                                                        src={`/items/${masterInfo.region}.svg`}
                                                        alt={'아이템'}
                                                        fill
                                                        className="object-contain"
                                                        priority
                                                    />
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h2 className="font-pretendard text-pretendard-l text-brand-black text-center">
                                                {speechData.title}
                                            </h2>

                                            {/* Story Content */}
                                            <p className="font-pretendard text-pretendard-m text-brand-black">
                                                {speechData.summary}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Button - 같은 위치에 고정 */}
                    <div className="absolute top-[700px] left-0 right-0">
                        <Button
                            onClick={() => router.push('/master')}
                            variant='master'
                            className="w-full"
                        >
                            처음으로
                        </Button>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="flex flex-col justify-center min-h-screen w-full px-4">
                    <div className="flex-1 w-full p-6 mx-auto relative">
                        {/* Timer Area */}
                        <div className="absolute top-6 left-0 right-0">
                            {isRecording && (
                                <div className="font-pretendard text-pretendard-xl text-brand-black text-center mb-1">
                                <span>{formatTime(recordingTime)}</span>
                                </div>
                            )}
                        </div>

                        {/* Visualizer Area */}
                        <div className="absolute top-20 left-0 right-0">
                            {isRecording && (
                                <div>
                                    <AudioVisualizer isRecording={isRecording}/>
                                </div>
                            )}
                        </div>

                        {/* Text Area */}
                        <div className="absolute top-[20px] left-0 right-0">
                            <h1 className="font-pretendard text-pretendard-xl text-brand-black mt-[200px] text-center">
                                {isRecording ? '듣고있어요!' : (
                                    <>
                                    {masterInfo.name} 어르신의<br/>
                                        이야기를 들려주세요
                                    </>
                                )}
                            </h1>
                        </div>

                        {/* Recording Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={isRecording ? stopRecording : startRecording}
                                className={`w-[120px] h-[120px] mt-[570px] rounded-full flex items-center justify-center transition-all font-pretendard text-pretendard-xl ${
                                    isRecording
                                        ? 'bg-brand-primary3'
                                        : 'bg-brand-primary1'
                                }`}>
                                <div
                                    className={`absolute w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center transition-all ${
                                        isRecording
                                            ? 'bg-brand-primary1'
                                            : 'bg-brand-primary2'
                                    }`}>
                                    {isRecording ? '끝!' : '시작'}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="flex flex-col justify-center min-h-screen w-full px-4">
            <div className="flex-1 w-full p-6 mx-auto relative">
                {getDisplayContent()}
            </div>
        </div>
    );
}