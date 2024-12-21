import Provider from '@/lib/utils/Provider';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-[420px] min-h-screen mx-auto'>
          {children}
        </div>
      </div>
    </Provider>
  );
}
