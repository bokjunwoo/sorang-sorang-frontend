'use client';

import React, { useEffect, useState } from 'react';
import FullStory from './FullStory';
import StoryButton from './StoryButton';
import StoryNav from './StoryNav';
import Image from 'next/image';
import QuizModal from './QuizModal';
import { useParams } from 'next/navigation';
import { useExplore } from '@/lib/api/user';

import { StoryInfo } from '@/types/story';
import { useStoryStore } from '@/store/story';

export default function StoryContent() {
  const { id } = useParams();
  const { data } = useExplore();
  const story: StoryInfo | undefined = data?.find(
    (item: StoryInfo) => item.id === parseInt(id as string)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const addCompletedStory = useStoryStore((state) => state.addCompletedStory);

  useEffect(() => {
    if (story?.id && story?.region) {
      addCompletedStory({
        id: story.id,
        location: story.region,
      });
    }
  }, [story, addCompletedStory]);

  return (
    <div className='w-full h-screen bg-brand-bg1 flex flex-col justify-center'>
      {/* 헤더 */}
      <StoryNav storyId={parseInt(id as string)} />

      {/* 가운데 콘텐츠 영역 */}
      <div className='flex-grow flex flex-col items-center justify-center mb-11'>
        <div className='mb-[10px]'>
          <Image
            src={`/items/${story?.region}.svg`}
            alt={'item.keyword'}
            width={112}
            height={112}
          />
        </div>

        <div className='mb-[40px]'>
          <FullStory />
        </div>
      </div>

      {/* 푸터 */}
      {!isModalOpen && (
        <div className='absolute bottom-10 left-0 right-0 px-4 text-hakgyo-l'>
          <StoryButton onClick={openModal} />
        </div>
      )}

      {isModalOpen && <QuizModal onClose={closeModal} />}
    </div>
  );
}
