export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      <div>{children}</div>
    </div>
  );
}
