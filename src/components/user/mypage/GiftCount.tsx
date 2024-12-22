'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GiftCount() {
  const [giftItems, setGiftItems] = useState<string[]>([]);

  // 로컬스토리지에서 'gift' 키값을 가져와 giftItems 상태에 저장
  useEffect(() => {
    const storedGifts = localStorage.getItem('gift');
    if (storedGifts) {
      setGiftItems(JSON.parse(storedGifts)); // 로컬스토리지에서 gift 배열을 파싱하여 상태에 저장
    }
  }, []);

  return (
    <div className='h-[26px] flex items-center justify-centerw-16 bg-black/50 py-[1px] px-2 font-pretendard text-pretendard-s text-center text-white font-bold rounded-full gap-1'>
      <Image src={'/ui/pocket2.svg'} alt={'보자기'} width={20} height={20} />
      {giftItems.length} / 12
    </div>
  );
}
