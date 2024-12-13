'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

type LocationTextMap = {
  [key: string]: string;
};

export default function GiftIcon() {
  const { location } = useParams();
  console.log(location);

  const locationTextMap: LocationTextMap = {
    제주시: '한라봉',
    조천읍: '제주초가집',
    구좌읍: '제주해녀',
    성산읍: '제주돌담',
    표선면: '제주조랑말',
    남원읍: '제주흑돼지',
    서귀포시: '제주한라',
    안덕면: '제주야자수',
    대정읍: '돌하르방',
    한경면: '제주폭포',
    한림읍: '동백꽃',
    애월읍: '제주돌고래',
  };

  // location에 해당하는 텍스트
  const decodedLocation = decodeURIComponent(location as string);

  const locationText = locationTextMap[decodedLocation] || '알 수 없는 지역';

  return (
    <div className='w-72 h-80 bg-brand-bg2 rounded-2xl mt-[-40px]'>
      <div className='flex justify-center mt-24 mb-10'>
        <Image
          src={`/items/${location}.svg`}
          alt={'item.keyword'}
          width={112}
          height={112}
        />
      </div>

      <div className='text-brand-black text-hakgyo-l font-hakgyo text-center mb-10'>
        {locationText}
      </div>
    </div>
  );
}
