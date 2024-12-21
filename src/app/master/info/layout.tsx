import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='relative min-h-screen w-full overflow-hidden px-4'>
      <Image
        src='/bg/info_bg.svg'
        alt='Background'
        fill
        className='object-cover -z-10'
        priority
      />

      <div className='w-full max-w-[420px] min-h-screen mx-auto'>
        {children}
      </div>
    </div>
  );
}
