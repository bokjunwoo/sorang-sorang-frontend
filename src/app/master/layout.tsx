interface LayoutProps {
  children: React.ReactNode;
}

export default function MasterLayout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-[420px] min-h-screen mx-auto'>
        {children}
      </div>
    </div>
  );
}
