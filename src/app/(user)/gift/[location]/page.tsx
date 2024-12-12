import { Button } from '@/components/common/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function GiftPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mx-4 relative'>
      {/* Gift 이미지 */}
      <div className='relative'>
        <Image src='/gift.svg' alt={'gift'} width={340} height={200} />

        {/* 이미지 위에 텍스트 */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-4 font-hakgyo text-hakgyo-l'>
          선물 획득
        </div>
      </div>

      {/* 아래 박스 */}
      <div className='w-72 h-80 bg-brand-bg2 rounded-2xl mt-[-40px]'>
        <div className='flex justify-center mt-16 mb-10'>
          <Image
            src={`/${'item.keyword'}.svg`}
            alt={'item.keyword'}
            width={112}
            height={112}
            className='bg-gray-400 rounded-full'
          />
        </div>

        <div className='text-brand-black text-hakgyo-l font-hakgyo text-center mb-10'>
          동백꽃
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <Link href={'/'}>
        <Button className='absolute bottom-4 left-1/2 transform -translate-x-1/2 mb-10'>
          잘들었어요
        </Button>
      </Link>
    </div>
  );
}
