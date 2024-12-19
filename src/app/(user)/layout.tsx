import Provider from '@/lib/utils/Provider';
import Image from 'next/image';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <div className='min-h-screen'>
        <Image
          src='/bg/user_bg.svg'
          alt='Background'
          fill
          className='object-cover -z-10'
          priority
        />

        <div>{children}</div>
      </div>
    </Provider>
  );
}
