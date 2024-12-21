import GiftButton from '@/components/user/gift/GiftButton';
import GiftIcon from '@/components/user/gift/GiftIcon';
import Image from 'next/image';

export default function GiftPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mx-4 relative'>
      {/* Gift 이미지 */}
      <div className='relative -mt-16'>
        <Image
          src='/ui/gift.svg'
          alt={'gift'}
          width={340}
          height={200}
          className='filter drop-shadow(0 0 2px rgba(0, 0, 0, 0.25))'
        />
      </div>

      {/* 아래 박스 */}
      <GiftIcon />

      {/* 하단 고정 버튼 */}
      <GiftButton />
    </div>
  );
}
