import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen w-full overflow-hidden px-4'>
      <Image
        src='/bg/user_bg.svg'
        alt='Background'
        fill
        className='object-cover -z-10'
        priority
      />

      <div>{children}</div>
    </div>
  );
}
