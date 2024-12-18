'use client';

import React, { useState } from 'react';
import FullStory from './FullStory';
import StoryButton from './StoryButton';
import StoryNav from './StoryNav';
import Image from 'next/image';
import QuizModal from './QuizModal';
import { useParams } from 'next/navigation';
import { useExplore } from '@/lib/api/user';
import {UserInfo} from "@/types/user";

export default function StoryContent() {
  const { id } = useParams();
  const { data } = useExplore();

  const story: UserInfo | undefined = data?.find((item: UserInfo) => item.id === parseInt(id as string));
  console.log(story);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='w-full h-screen bg-brand-bg1 flex flex-col justify-center'>
      {/* 헤더 */}
      <div className='h-[64px] mt-[20px]'>
        <StoryNav />
      </div>

      {/* 가운데 콘텐츠 영역 */}
      <div className='flex-grow flex flex-col items-center justify-center'>
          <div className="mb-[20px]">
              <Image
                  src={`/items/${story?.region}.svg`}
                  alt={'item.keyword'}
                  width={112}
                  height={112}
              />
          </div>

          <div className="mb-[40px]">
              <FullStory />
          </div>
      </div>

      {/* 푸터 */}
      {!isModalOpen && (
        <div className='h-[64px] flex items-center justify-center mb-14'>
          <StoryButton onClick={openModal} />
        </div>
      )}

      {isModalOpen && <QuizModal onClose={closeModal} />}
    </div>
  );
}
