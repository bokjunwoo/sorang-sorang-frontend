'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { useEffect, useState } from 'react';

export default function GiftButton() {
  const { location } = useParams();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleButtonClick = () => {
    const decodedLocation = decodeURIComponent(location as string);

    const storedGifts = localStorage.getItem('gift');
    const storedNew = localStorage.getItem('new');
    const giftItems = storedGifts ? JSON.parse(storedGifts) : [];

    if (decodedLocation && !giftItems.includes(decodedLocation)) {
      giftItems.push(decodedLocation);
      localStorage.setItem('gift', JSON.stringify(giftItems)); // 로컬스토리지에 저장
    }

    if (!storedNew) {
      localStorage.setItem('new', 'false');
    }

    // 홈 화면으로 리디렉션
    router.push('/mypage'); // '/'로 이동
  };

  // 클라이언트에서만 렌더링
  if (!isClient) {
    return null; // 클라이언트 측에서만 실행되므로 서버에서는 아무것도 렌더링하지 않음
  }

  const hasGift = localStorage.getItem('gift')
      ? JSON.parse(localStorage.getItem('gift')!).includes(decodeURIComponent(location as string))
      : false;

  return (
    <Button
      className='absolute text-hakgyo-l bottom-4 left-1/2 transform -translate-x-1/2 mb-10'
      onClick={handleButtonClick} // 버튼 클릭 시 handleButtonClick 실행
    >
      {hasGift ? '이미 선물을 받았어요!' : '잘 들었어요'}
    </Button>
  );
}
