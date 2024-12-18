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
}: Props) {
  return (
    <div className="flex justify-center items-center h-screen -mt-32">
      <div className='flex w-full space-x-5'>
        {showSideBox && (
          <div
            className={`w-[7%] h-[500px] bg-brand-bg1 min-h-[100px] rounded-tr-lg rounded-br-lg`}
          ></div>
        )}

        <div className={`w-[86%] h-[500px] rounded-lg  bg-brand-bg1 border-4 border-brand-bg2`}>
          <div className='w-full h-full text-brand-black flex flex-col justify-center items-center'>
            {/* Text Chip */}
            <div className='my-5 top-10 h-7 px-4 py-1 mt-[30px] font-hakgyo text-hakgyo-m bg-brand-bg2 text-brand-black rounded-full opacity-80'>
              제주시 {item.region}
            </div>

            {/* Text Content */}
            <div className='mb-3 text-center'>
              <div className='font-hakgyo text-hakgyo-l'>
                {item.name} {item.gender}의
              </div>
              <div className='font-hakgyo text-hakgyo-l'>
                {item.title}
              </div>
            </div>

            {/* Image Container */}
            <div className="mt-[20px] mb-[20px]">
              <Image
                  src={`/items/${item.region}.svg`}
                  alt={item.keyword}
                  width={112}
                  height={112}
              />
            </div>

            {/* Text Box */}
            <div className='text-center my-5 px-3 font-pretendard text-pretendard-m pb-[10px] h-[5em] line-clamp-3 overflow-hidden'>
              {item.description}
            </div>
          </div>
        </div>

        {showSideBox && (
          <div
            className={`w-[7%] h-[500px] bg-brand-bg1 min-h-[100px] rounded-tl-lg rounded-bl-lg`}
          ></div>
        )}
      </div>
    </div>
  );
}
