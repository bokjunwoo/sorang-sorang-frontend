'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';

export default function MasterPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/master/info');
  };

  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      <Image
        src='/bg/master_bg.svg'
        alt='Background'
        fill
        className='object-cover -z-10'
        priority
      />

      <div className='absolute bottom-10 left-0 right-0 px-4'>
        <Button onClick={handleClick} variant='master' className='w-full'>
          시작하기
        </Button>
      </div>
    </div>
  );
}
