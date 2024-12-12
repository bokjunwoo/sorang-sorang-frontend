import { Chip } from '@/components/common/Chip';
import Image from 'next/image';

export default function StoryNav() {
  return (
    <nav className='w-full h-16 flex items-center px-4 justify-between'>
      {/* 좌측 < 아이콘 */}
      <div className='flex-start'>
        <Image
          src='/left_arrow_b.svg'
          alt='Back Arrow'
          width={24} // 아이콘의 너비를 24px로 설정
          height={24} // 아이콘의 높이를 24px로 설정
          className='text-black' // SVG에 검정색을 적용
        />
      </div>

      {/* 중앙 "이야기" 텍스트 */}
      <div className='flex-end'>
        <Chip size='large'>목소리 듣기</Chip>
      </div>
    </nav>
  );
}
