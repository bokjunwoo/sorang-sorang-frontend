'use client'

import { ChipProps } from '@/types/common';
import Image from 'next/image';
import {useEffect, useRef, useState} from "react";

export const Chip = ({
  size = 'small',
  className = '',
  audioUrl,
  playText = '목소리 듣기',
  stopText = '목소리 끄기',
}: ChipProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sizeClasses = {
    small: {
      container: 'min-w-[70px] h-6',
      icon: 'w-4 h-4',
      font: 'text-hakgyo-s',
    },
    large: {
      container: 'min-w-[83px] h-7',
      icon: 'w-5 h-5',
      font: 'text-hakgyo-m',
    },
  };

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  const toggleAudio = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
        onClick={audioUrl ? toggleAudio : undefined}
      className={`
        inline-flex items-center justify-start
        bg-brand-bg2 text-brand-black font-hakgyo
        px-3 py-[1px] gap-[10px]
        rounded-lg
        ${audioUrl ? 'cursor-pointer' : ''}
        ${sizeClasses[size].container}
        ${className}
      `}
    >
      <div className='inline-flex items-center gap-1 flex-grow'>
        <span className={`${sizeClasses[size].font} whitespace-nowrap`}>
          {isPlaying ? stopText : playText}
        </span>
        <Image
          src={isPlaying ? '/volumeOff.svg' : '/volume.svg'}
          alt='Volume'
          width={size === 'small' ? 16 : 20}
          height={size === 'small' ? 16 : 20}
          className={`
            ${sizeClasses[size].icon}
            ${
              size === 'small'
                ? 'p-[1.33px_1.33px_0.85px_2px]'
                : 'p-[1.67px_1.67px_1.06px_2.5px]'
            }
          `}
        />
      </div>
    </div>
  );
};
