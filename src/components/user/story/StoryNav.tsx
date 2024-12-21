'use client';

import { Chip } from '@/components/common/Chip';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StoryInfo } from '@/types/story';
import { getSpeechResult } from '@/lib/api/story';

export default function StoryNav({ storyId }: { storyId: number }) {
  const router = useRouter();
  const [storyData, setStoryData] = useState<StoryInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await getSpeechResult(storyId);
        if (response.success && response.data) {
          setStoryData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch story data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoryData();
  }, [storyId]);

  return (
    <nav className='w-full flex items-center px-4 justify-between mt-6'>
      <div
        className='flex-start cursor-pointer'
        onClick={() => router.push('/explore')}
      >
        <Image
          src='/ui/left_arrow_b.svg'
          alt='Back Arrow'
          width={24} // 아이콘의 너비를 24px로 설정
          height={24} // 아이콘의 높이를 24px로 설정
          className='text-black' // SVG에 검정색을 적용
        />
      </div>

      {/* 중앙 "이야기" 텍스트 */}
      <div className='flex-end'>
        {!isLoading && storyData && (
          <Chip
            size='large'
            audioUrl={storyData.audioUrl}
            playText='목소리 듣기'
            stopText='목소리 끄기'
          />
        )}
      </div>
    </nav>
  );
}
