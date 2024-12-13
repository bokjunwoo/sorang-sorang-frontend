'use client';

import { useState, useEffect } from 'react';

export default function Count() {
  const [giftItems, setGiftItems] = useState<string[]>([]);

  // 로컬스토리지에서 'gift' 키값을 가져와 giftItems 상태에 저장
  useEffect(() => {
    const storedGifts = localStorage.getItem('gift');
    if (storedGifts) {
      setGiftItems(JSON.parse(storedGifts)); // 로컬스토리지에서 gift 배열을 파싱하여 상태에 저장
    }
  }, []);

  return (
    <div className='flex items-center justify-centerw-16 py-1.5 px-4 font-pretendard text-center font-bold rounded-2xl bg-black opacity-50'>
      {giftItems.length} / 12
    </div>
  );
}
