'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function QuestBadgeCollection() {
  const [giftItems, setGiftItems] = useState<string[]>([]);

  // 로컬스토리지에서 'gift' 키값을 가져와 giftItems 상태에 저장
  useEffect(() => {
    const storedGifts = localStorage.getItem('gift');
    if (storedGifts) {
      setGiftItems(JSON.parse(storedGifts)); // 로컬스토리지에서 gift 배열을 파싱하여 상태에 저장
    }
  }, []);

  // 지역 이름과 아이콘 및 className을 매핑
  const regions = [
    {
      name: '제주시',
      icon: '/items/제주시.svg',
      width: 48,
      height: 48,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[120px] translate-x-[50px]',
    },
    {
      name: '구좌읍',
      icon: '/items/구좌읍.svg',
      width: 60,
      height: 60,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[-260px] translate-x-[-150px]',
    },
    {
      name: '남원읍',
      icon: '/items/남원읍.svg',
      width: 60,
      height: 60,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[60px] translate-x-[50px]',
    },
    {
      name: '대정읍',
      icon: '/items/대정읍.svg',
      width: 48,
      height: 48,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[110px] translate-x-[-50px]',
    },
    {
      name: '서귀포시',
      icon: '/items/서귀포시.svg',
      width: 180,
      height: 180,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[180px] translate-x-[-85px]',
    },
    {
      name: '안덕면',
      icon: '/items/안덕면.svg',
      width: 60,
      height: 60,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[20px] translate-x-[-125px]',
    },
    {
      name: '애월읍',
      icon: '/items/애월읍.svg',
      width: 80,
      height: 80,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[-250px] translate-x-[50px]',
    },
    {
      name: '조천읍',
      icon: '/items/조천읍.svg',
      width: 60,
      height: 60,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[130px] translate-x-[-125px]',
    },
    {
      name: '성산읍',
      icon: '/items/성산읍.svg',
      width: 60,
      height: 60,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[100px] translate-x-[-155px]',
    },
    {
      name: '표선면',
      icon: '/items/표선면.svg',
      width: 60,
      height: 60,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[40px] translate-x-[100px]',
    },
    {
      name: '한경면',
      icon: '/items/한경면.svg',
      width: 80,
      height: 80,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[150px] translate-x-[100px]',
    },
    {
      name: '한림읍',
      icon: '/items/한림읍.svg',
      width: 48,
      height: 48,
      className:
        'absolute left-1/2 transform top-1/2 -translate-y-[0px] translate-x-[60px]',
    },
  ];

  return (
    <div className="relative w-full h-screen -mt-[200px]">
      {regions.map((region) => {
        // giftItems 배열에 해당 지역 이름이 포함되어 있으면 그 지역 아이콘을 렌더링
        if (giftItems.includes(region.name)) {
          return (
            <Image
              key={region.name}
              src={region.icon}
              alt={region.name}
              width={region.width}
              height={region.height}
              className={region.className} // 각 지역에 해당하는 className을 적용
            />
          );
        }
        return null;
      })}
    </div>
  );
}
