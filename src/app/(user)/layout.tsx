import Provider from '@/lib/utils/Provider';
import Image from 'next/image';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <Provider>
          <div className='min-h-screen relative'>
              <div className="fixed inset-0 -z-10">
                  <Image
                      src='/bg/user_bg.svg'
                      alt='Background'
                      fill
                      className='object-cover'
                      priority
                  />
              </div>
              <div className="relative">
                  {children}
              </div>
          </div>
      </Provider>
  );
}
