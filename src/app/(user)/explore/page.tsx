'use client';

import { Button } from '@/components/common/Button';
import Carousel from '@/components/user/Carousel';
import ExploreNav from '@/components/user/explore/ExploreNav';
import { useExplore } from '@/lib/api/user';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ExplorePage() {
  const { data } = useExplore(); // API로 데이터를 가져옵니다.

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLocations, setCompletedLocations] = useState<string[]>([]);

  // 슬라이드 변경 시 호출되는 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.realIndex); // 실제 인덱스를 업데이트
  };

  useEffect(() => {
    // 로컬스토리지에서 'gift' 배열을 가져옵니다.
    const stored = localStorage.getItem('gift');
    if (stored) {
      setCompletedLocations(JSON.parse(stored)); // 완료된 지역들을 저장합니다.
    }
  }, []);

  // 해당 지역이 완료된 지역인지 확인하는 함수
  const isLocationCompleted = (location: string) => {
    return completedLocations.includes(location); // 완료된 지역이면 true
  };

  if (!data) return null;

  // 현재 선택된 지역
  const selectedLocation = data[currentIndex]?.location;

  // "이야기보따리 듣기" 버튼의 비활성화 여부
  const isButtonDisabled = selectedLocation
    ? isLocationCompleted(selectedLocation)
    : false;

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen'>
      {/* ExploreNav 컴포넌트 */}
      <ExploreNav />

      {/* Carousel 컴포넌트 - 중앙 정렬 */}
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <Carousel showSideBox={true} size='lg' onChange={handleSlideChange} />
      </div>

      {/* "이야기보따리 듣기" 버튼 */}
      <Link href={`/story/${currentIndex + 1}`}>
        <div className='absolute bottom-10 w-full flex justify-center'>
          <Button
            variant={isButtonDisabled ? 'disabled' : 'default'}
            className='mb-10 z-10 right-48 top-6'
          >
            {isButtonDisabled ? '이미 완료된 지역입니다' : '이야기보따리 듣기'}
          </Button>
        </div>
      </Link>
    </div>
  );
}
