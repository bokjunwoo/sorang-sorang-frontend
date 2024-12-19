import GiftButton from '@/components/user/gift/GiftButton';
import GiftIcon from '@/components/user/gift/GiftIcon';
import Image from 'next/image';

export default function GiftPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mx-4 relative'>
      {/* Gift 이미지 */}
      <div className='relative -mt-16'>
        <Image src='/gift.svg' alt={'gift'} width={340} height={200} className="filter drop-shadow(0 0 2px rgba(0, 0, 0, 0.25))"/>

        {/* 이미지 위에 텍스트 */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-4 font-hakgyo text-hakgyo-l'>
          선물 획득!
        </div>
      </div>

      {/* 아래 박스 */}
      <GiftIcon />

      {/* 하단 고정 버튼 */}
      <GiftButton />
    </div>
  );
}
