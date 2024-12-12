'use client';

import { useExplore } from '@/lib/api/user';
import { useParams } from 'next/navigation';

export default function FullStory() {
  const { id } = useParams();

  const { data } = useExplore();

  const story = data?.find((item) => item.id === parseInt(id as string));

  return (
    <div>
      <div className='font-hakgyo text-hakgyo-l text-black text-center'>
        {story?.title}
      </div>

      <div className='font-pretendard text-pretendard-m text-black py-3 px-8'>
        {story?.full_description}
      </div>
    </div>
  );
}
