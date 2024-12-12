'use client';

import { Button } from '@/components/common/Button';
import Carousel from '@/components/user/Carousel';
import ExploreNav from '@/components/user/explore/ExploreNav';
import Link from 'next/link';
import { useState } from 'react';

export default function ExplorePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.realIndex); // realIndex를 사용하면 슬라이드의 실제 인덱스를 얻을 수 있습니다.
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      {/* ExploreNav 컴포넌트 */}
      <ExploreNav />

      {/* Carousel 컴포넌트 - 중앙 정렬 */}
      <div className='flex flex-col items-center justify-center w-full h-full my-10'>
        <Carousel showSideBox={true} size='lg' onChange={handleSlideChange} />
      </div>

      <Link href={`/story/${currentIndex + 1}`}>
        <Button>이야기보따리 듣기</Button>
      </Link>
    </div>
  );
}
