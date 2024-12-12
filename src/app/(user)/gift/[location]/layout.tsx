export default function GiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className='absolute inset-0 bg-black opacity-50 z-10'></div>

      <div className='relative z-20'>{children}</div>
    </div>
  );
}
