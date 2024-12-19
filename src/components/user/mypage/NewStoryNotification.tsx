'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {getLatestStory} from "@/lib/api/story";

export default function NewStoryNotification() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [masterInfo, setMasterInfo] = useState<{
    name: string;
    gender: '할머니' | '할아버지';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('new');
    if (stored) {
      setIsVisible(JSON.parse(stored));
    }

    const fetchLatestStory = async () => {
      try {
        const data = await getLatestStory();
        setMasterInfo({
          name: data.masterName,
          gender: data.masterGender
        });
      } catch (error) {
        console.error('Failed to fetch latest story:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestStory();
  }, []);

  return (
    <div className='relative px-4 mt-12'>
      {/* 알림 메시지 컨테이너 */}
      <div className='flex justify-center'>
        {!isLoading && masterInfo && isVisible && (
            <Link href={'/story/1'}>
              <div className='font-hakgyo text-hakgyo-l text-brand-black bg-white p-4 rounded-2xl'>
                <div>{masterInfo.name} {masterInfo.gender}의</div>
                <div>새로운 이야기가 도착했어요!</div>
              </div>
            </Link>
        )}
      </div>

      {/* 보따리 이미지 - 오른쪽 고정 */}
      <div className='absolute right-4 -top-2'>
        <Link href={'/explore'}>
          <Image src={'/pocket.svg'} alt={'보따리열기'} width={80} height={80}/>
        </Link>
      </div>
    </div>
  );
}
