export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-mt-[20px]">
      <div className='-mt-[30px] -mr-[10px] absolute inset-0 bg-black opacity-50 z-10'></div>
      <div className='relative z-20'>{children}</div>
    </div>
  );
}
