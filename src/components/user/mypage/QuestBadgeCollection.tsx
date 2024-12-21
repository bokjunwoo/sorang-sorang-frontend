'use client';

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
      className: 'absolute top-[calc(50%-120px)] left-[calc(50%+50px)]', // 부모 기준으로 배치
    },
    {
      name: '구좌읍',
      icon: '/items/구좌읍.svg',
      width: 60,
      height: 60,
      className: 'absolute top-[calc(50%+260px)] left-[calc(50%-150px)]',
    },
    {
      name: '남원읍',
      icon: '/items/남원읍.svg',
      width: 60,
      height: 60,
      className: 'absolute top-[calc(50%-60px)] left-[calc(50%+50px)]',
    },
    {
      name: '대정읍',
      icon: '/items/대정읍.svg',
      width: 48,
      height: 48,
      className: 'absolute top-[calc(50%-120px)] left-[calc(50%-50px)]',
    },
    {
      name: '서귀포시',
      icon: '/items/서귀포시.svg',
      width: 180,
      height: 180,
      className: 'absolute top-[calc(50%-185px)] left-[calc(50%-85px)]',
    },
    {
      name: '안덕면',
      icon: '/items/안덕면.svg',
      width: 60,
      height: 60,
      className: 'absolute top-[calc(50%-30px)] left-[calc(50%-145px)]',
    },
    {
      name: '애월읍',
      icon: '/items/애월읍.svg',
      width: 80,
      height: 80,
      className: 'absolute top-[calc(50%+260px)] left-[calc(50%+80px)]',
    },
    {
      name: '조천읍',
      icon: '/items/조천읍.svg',
      width: 70,
      height: 70,
      className: 'absolute top-[calc(50%-140px)] left-[calc(50%-135px)]',
    },
    {
      name: '성산읍',
      icon: '/items/성산읍.svg',
      width: 60,
      height: 60,
      className: 'absolute top-[calc(50%-110px)] left-[calc(50%-175px)]',
    },
    {
      name: '표선면',
      icon: '/items/표선면.svg',
      width: 60,
      height: 60,
      className: 'absolute top-[calc(50%-40px)] left-[calc(50%+100px)]',
    },
    {
      name: '한경면',
      icon: '/items/한경면.svg',
      width: 80,
      height: 80,
      className: 'absolute top-[calc(50%-130px)] left-[calc(50%+120px)]',
    },
    {
      name: '한림읍',
      icon: '/items/한림읍.svg',
      width: 48,
      height: 48,
      className: 'absolute top-[calc(50%+20px)] left-[calc(50%+60px)]',
    },
  ];

  return (
    <div className='w-full'>
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
