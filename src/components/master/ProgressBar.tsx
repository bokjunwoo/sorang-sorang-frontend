import React from 'react';

interface ProgressBarProps {
    currentStep: number;  // 현재 단계
    totalSteps: number;   // 전체 단계 수
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="relative mt-6">
            {/* 전체 바 컨테이너 */}
            <div
                className="w-80 h-2 bg-white rounded-lg w-full"
                style={{
                    opacity: 0.3,
                }}
            />

            {/* 진행 바 */}
            <div
                className="absolute top-0 left-0 h-2 bg-brand-primary1 rounded-lg transition-all duration-300 ease-in-out"
                style={{
                    width: `${progress}%`,
                    maxWidth: '320px'
                }}
            />
        </div>
    );
};

export default ProgressBar;