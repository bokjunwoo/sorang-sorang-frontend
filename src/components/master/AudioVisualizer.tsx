import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
    isRecording: boolean;
}

const AudioVisualizer = ({ isRecording }: AudioVisualizerProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        if (isRecording) {
            startVisualization();
        } else {
            stopVisualization();
        }

        return () => {
            stopVisualization();
        };
    }, [isRecording]);

    const startVisualization = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;

            const AudioContext = window.AudioContext || window.AudioContext;
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();

            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);

            analyserRef.current.fftSize = 32;
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Scale for retina displays
            ctx.scale(dpr, dpr);

            const draw = () => {
                const width = rect.width;
                const height = rect.height;

                if (!analyserRef.current) return;
                analyserRef.current.getByteFrequencyData(dataArray);

                ctx.clearRect(0, 0, width, height);

                const dataPoints = 4;
                const step = Math.floor(bufferLength / dataPoints);
                const barWidth = 10;
                const gap = 6;
                const totalWidth = (barWidth * dataPoints) + (gap * (dataPoints - 1));
                const startX = (width - totalWidth) / 2;

                for (let i = 0; i < dataPoints; i++) {
                    const dataIndex = i * step;
                    let barHeight = (dataArray[dataIndex] / 255) * height * 0.5;
                    barHeight = Math.max(5, barHeight);

                    const x = startX + i * (barWidth + gap);

                    ctx.fillStyle = '#FA8339';

                    const radius = barWidth / 2;
                    ctx.beginPath();
                    ctx.moveTo(x + radius, height/2 - barHeight/2);
                    ctx.lineTo(x + barWidth - radius, height/2 - barHeight/2);
                    ctx.quadraticCurveTo(x + barWidth, height/2 - barHeight/2, x + barWidth, height/2 - barHeight/2 + radius);
                    ctx.lineTo(x + barWidth, height/2 + barHeight/2 - radius);
                    ctx.quadraticCurveTo(x + barWidth, height/2 + barHeight/2, x + barWidth - radius, height/2 + barHeight/2);
                    ctx.lineTo(x + radius, height/2 + barHeight/2);
                    ctx.quadraticCurveTo(x, height/2 + barHeight/2, x, height/2 + barHeight/2 - radius);
                    ctx.lineTo(x, height/2 - barHeight/2 + radius);
                    ctx.quadraticCurveTo(x, height/2 - barHeight/2, x + radius, height/2 - barHeight/2);
                    ctx.closePath();
                    ctx.fill();
                }

                animationFrameRef.current = requestAnimationFrame(draw);
            };

            draw();
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const stopVisualization = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <div className="w-full h-32 flex items-center justify-center">
            <canvas
                ref={canvasRef}
                className="w-full max-w-md rounded-lg"
                style={{ height: '100px' }}
            />
        </div>
    );
};

export default AudioVisualizer;