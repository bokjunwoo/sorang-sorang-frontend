import { UserInfo } from '@/types/user';
import Image from 'next/image';

type Props = {
  showSideBox?: boolean;
  item: UserInfo;
  height?: string;
};

export default function CarouselSlide({
  showSideBox = false,
  item,
  height = '100px',
}: Props) {
  return (
    <div>
      <div className='flex w-full h-full space-x-5'>
        {showSideBox && (
          <div
            className={`w-[7%] h-[${[
              height,
            ]}] bg-gray-300 min-h-[100px] rounded-tr-lg rounded-br-lg`}
          ></div>
        )}

        <div className={`w-[86%] h-[${[height]}] rounded-lg  bg-brand-bg2`}>
          <div className='w-full h-full text-black flex flex-col justify-center items-center'>
            {/* Text Chip */}
            <div className='px-4 py-2 my-5 bg-gray-300 text-sm text-black rounded-full opacity-50'>
              제주시 애월읍
            </div>

            {/* Text Content */}
            <div className='my-5 text-center'>
              <div className='font-hakgyo text-hakgyo-l'>
                {item.name} {item.gender}의
              </div>
              <div className='font-hakgyo text-hakgyo-l'>
                {item.title} 이야기
              </div>
            </div>

            {/* Image Container */}
            <Image
              src={`/${item.keyword}.svg`}
              alt={item.keyword}
              width={112}
              height={112}
            />

            {/* Text Box */}
            <div className='my-5 px-3 font-pretendard text-pretendard-m'>
              {item.description}
            </div>
          </div>
        </div>

        {showSideBox && (
          <div
            className={`w-[7%] h-[${[
              height,
            ]}] bg-gray-300 min-h-[100px] rounded-tl-lg rounded-bl-lg`}
          ></div>
        )}
      </div>
    </div>
  );
}
