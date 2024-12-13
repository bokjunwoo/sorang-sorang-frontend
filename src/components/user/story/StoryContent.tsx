'use client';

import React, { useState } from 'react';
import FullStory from './FullStory';
import StoryButton from './StoryButton';
import StoryNav from './StoryNav';
import Image from 'next/image';
import Modal from './Modal';
import { useParams } from 'next/navigation';
import { useExplore } from '@/lib/api/user';

export default function StoryContent() {
  const { id } = useParams();

  const { data } = useExplore();

  const story = data?.find((item) => item.id === parseInt(id as string));
  console.log(story);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='w-full h-screen bg-brand-bg1 flex flex-col justify-center'>
      {/* 헤더 */}
      <div className='h-[64px]'>
        <StoryNav />
      </div>

      {/* 가운데 콘텐츠 영역 */}
      <div className='flex-grow flex flex-col items-center justify-center'>
        <Image
          src={`/items/${story?.location}.svg`}
          alt={'item.keyword'}
          width={112}
          height={112}
        />

        <FullStory />
      </div>

      {/* 푸터 */}
      {!isModalOpen && (
        <div className='h-[64px] flex items-center justify-center mb-14'>
          <StoryButton onClick={openModal} />
        </div>
      )}

      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}
