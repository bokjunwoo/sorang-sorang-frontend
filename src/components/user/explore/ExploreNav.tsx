import Image from 'next/image';

export default function ExploreNav() {
  return (
    <nav className='w-full h-16 flex items-center px-4'>
      {/* 좌측 < 아이콘 */}
      <div className='flex-shrink-0'>
        <Image
          src='/left_arrow.svg'
          alt='Back Arrow'
          width={24} // 아이콘의 너비를 24px로 설정
          height={24} // 아이콘의 높이를 24px로 설정
          className='text-black' // 아이콘 색상을 검정색으로 설정
        />
      </div>

      {/* 중앙 "이야기" 텍스트 */}
      <div className='flex-grow text-center'>
        <span className='text-white text-2xl mr-6 font-pretendard text-pretendard-m'>
          이야기 선택하기
        </span>
      </div>
    </nav>
  );
}
