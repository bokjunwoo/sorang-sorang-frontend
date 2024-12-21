'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import Input from '@/components/common/Input';
import * as z from 'zod';
import { userStore } from '@/store/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
});

export default function HomePage() {
  const router = useRouter();
  const [showLayer, setShowLayer] = useState(false);
  const setUserName = userStore((state) => state.setName);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const handleClick = () => {
    setShowLayer(true);
  };

  const handleSubmit = form.handleSubmit((data) => {
    if (data.name.trim()) {
      setUserName(data.name.trim());
      router.push('/mypage'); // 또는 다음 페이지 경로
    }
  });

  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      {!showLayer && (
        <>
          <Image
            src='bg/home_bg.svg'
            alt='Home'
            fill
            priority
            className='object-cover'
          />
          <div className='absolute bottom-10 left-0 right-0 px-4 text-hakgyo-l'>
            <Button onClick={handleClick} variant='default' className='w-full'>
              시작하기
            </Button>
          </div>
        </>
      )}

      {showLayer && (
        <>
          <Image
            src='/bg/overlay_bg.svg'
            alt='Home'
            fill
            priority
            className='object-cover'
          />
          <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4'>
            {/* 상단 텍스트 */}
            <div className='absolute top-0 text-center space-y-4 pt-14'>
              <h2 className='text-pretendard-xl font-pretendard text-brand-black'>
                안녕하세요!
                <br />
                이름이 무엇인가요?
              </h2>
            </div>

            {/* 입력 폼 중앙 배치 */}
            <form onSubmit={handleSubmit}>
              <div className='text-brand-black'>
                <Input
                  register={form.register('name')}
                  error={form.formState.errors.name?.message}
                  placeholder='이름을 알려주세요'
                  autoFocus
                />
              </div>

              {/* 버튼은 하단에 고정 */}
              <div className='absolute bottom-10 left-0 right-0 px-4 text-hakgyo-l'>
                <Button
                  type='submit'
                  variant='default'
                  className='w-full text-hakgyo-l'
                  disabled={!form.watch('name').trim()}
                >
                  확인
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
