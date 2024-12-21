import Image from 'next/image';

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      {/* 배경 이미지 */}
      <div className='absolute inset-0 -z-10'>
        <Image
          src='/bg/user_bg.svg'
          alt='Background'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* 검정색 오버레이 */}
      <div className='absolute inset-0 -z-10 bg-black opacity-50'></div>

      {/* children */}
      <div className='relative z-10'>{children}</div>
    </div>
  );
}
