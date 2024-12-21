'use client';

import { Button } from '@/components/common/Button';
import Carousel from '@/components/user/Carousel';
import ExploreNav from '@/components/user/explore/ExploreNav';
import { useExplore } from '@/lib/api/user';
import Link from 'next/link';
import { useState } from 'react';
import { useStoryStore } from '@/store/story';

export default function ExplorePage() {
  const { data } = useExplore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const completedStories = useStoryStore((state) => state.completedStories);

  // 슬라이드 변경 시 호출되는 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.realIndex); // 실제 인덱스를 업데이트
  };

  if (!data) return null;

  const currentStoryId = currentIndex + 1;
  const isStoryCompleted = completedStories.some(
    (story) => story.id === currentStoryId
  );
  const buttonText = isStoryCompleted ? '다시 듣기' : '이야기보따리 듣기';

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {/* ExploreNav 컴포넌트 */}
      <ExploreNav />

      {/* Carousel 컴포넌트 - 중앙 정렬 */}
      <div className='flex flex-grow items-center justify-center w-full mt-11'>
        <Carousel showSideBox={true} size='lg' onChange={handleSlideChange} />
      </div>

      {/* "이야기보따리 듣기" 버튼 */}
      <Link href={`/story/${currentStoryId}`}>
        <div className='absolute bottom-10 left-0 right-0 px-4 text-hakgyo-l'>
          <Button variant='default' className='w-full'>
            {buttonText}
          </Button>
        </div>
      </Link>
    </div>
  );
}
