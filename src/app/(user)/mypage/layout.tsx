import Image from 'next/image';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen'>
      <Image
        src='/user_bg.svg'
        alt='Background'
        fill
        className='object-cover -z-10'
        priority
      />

      <div>{children}</div>
    </div>
  );
}
