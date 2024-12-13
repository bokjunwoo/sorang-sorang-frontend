'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { useEffect, useState } from 'react';

export default function GiftButton() {
  const { location } = useParams(); // URL에서 location 파라미터를 가져옵니다.
  const [isClient, setIsClient] = useState(false); // 클라이언트 여부를 확인할 상태

  const router = useRouter(); // Next.js의 useRouter 훅 사용

  // useEffect를 사용해 클라이언트 측에서만 실행되도록 설정
  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 실행되도록 설정
  }, []);

  // 버튼 클릭 시 실행되는 함수
  const handleButtonClick = () => {
    // location 값이 URL 인코딩되어 있을 수 있으므로 디코딩
    const decodedLocation = decodeURIComponent(location as string);

    // 로컬스토리지에서 gift 배열을 가져옵니다.
    const storedGifts = localStorage.getItem('gift');
    const storedNew = localStorage.getItem('new');

    // gift가 존재하면 해당 배열을 파싱하고, 없다면 빈 배열로 설정
    const giftItems = storedGifts ? JSON.parse(storedGifts) : [];

    // gift 배열에 현재 location을 추가 (중복되지 않도록)
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

  return (
    <Button
      className='absolute text-hakgyo-l bottom-4 left-1/2 transform -translate-x-1/2 mb-10'
      onClick={handleButtonClick} // 버튼 클릭 시 handleButtonClick 실행
    >
      잘 들었어요
    </Button>
  );
}
