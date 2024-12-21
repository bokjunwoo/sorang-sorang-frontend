'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestStory } from '@/lib/api/story';

export default function NewStoryNotification() {
  const [hasStory, setHasStory] = useState(false);
  const [masterInfo, setMasterInfo] = useState<{
    id: number;
    name: string;
    gender: '할머니' | '할아버지';
  } | null>(null);

  useEffect(() => {
    const fetchLatestStory = async () => {
      try {
        const data = await getLatestStory();

        // 스토리 데이터가 있으면 상태 업데이트
        if (data) {
          setHasStory(true);
          setMasterInfo({
            id: data.id,
            name: data.name,
            gender: data.gender,
          });
        }
      } catch (error) {
        console.error('Failed to fetch latest story:', error);
      }
    };

    fetchLatestStory();
  }, []);

  // 스토리가 있고 masterInfo가 있을 때만 알림 표시
  return (
    <div className='w-full flex mt-6'>
      {hasStory && masterInfo && (
        <Link
          href={`/story/${masterInfo.id}`}
          passHref
          className='cursor-pointer z-20 block w-full mr-4'
        >
          <div className='font-hakgyo text-hakgyo-m text-brand-black bg-white px-4 rounded-2xl py-4'>
            <div>
              {masterInfo.name} {masterInfo.gender}의
            </div>
            <div>새로운 이야기가 도착했어요!</div>
          </div>
        </Link>
      )}

      <div className='flex flex-col mt-1'>
        <Link href={'/explore'} className='cursor-pointer' passHref>
          <Image
            src='/ui/pocket.svg'
            alt='보따리열기'
            width={100}
            height={100}
          />
        </Link>

        <Link href={'/mypage'}>
          <Image
            src='/ui/collection.svg'
            alt='도감열기'
            width={100}
            height={100}
          />
        </Link>
      </div>
    </div>
  );
}
