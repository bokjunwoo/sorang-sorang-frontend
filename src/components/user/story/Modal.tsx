import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { useExplore } from '@/lib/api/user';

export default function Modal({ onClose }: { onClose: () => void }) {
  const { id } = useParams();

  const { data } = useExplore();

  const item = data?.find((item) => item.id === parseInt(id as string));

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!item) return null;

  // 문자열에서 배열로 변환하기
  let options: string[] = [];
  try {
    // item.options의 값이 문자열로 되어 있으므로, 불필요한 따옴표를 제거하고 JSON 형식으로 변환
    const cleanedOptions = item.options
      .replace(/'/g, '"') // 단일 따옴표를 모두 이중 따옴표로 변환
      .replace(/\[\s*(.*?)\s*\]/, '[$1]'); // 공백을 제거하고 배열 형식으로 변경

    options = JSON.parse(cleanedOptions); // 이제 올바르게 JSON 파싱
  } catch (e) {
    console.error('옵션 파싱 오류:', e);
  }

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index);
    if (index === item?.answer - 1) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsAnswered(true);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      {/* 모달 내용 */}
      <div className='bg-brand-bg1 px-6 py-10 rounded-lg w-11/12 max-w-lg relative'>
        {/* X 버튼 */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-3xl text-brand-black font-bold'
        >
          x
        </button>

        <div className='flex justify-center mb-10'>
          <Image
            src={`/items/${item.location}.svg`}
            alt={'item.keyword'}
            width={112}
            height={112}
          />
        </div>

        <h2 className='text-brand-black font-hakgyo text-hakgyo-l text-center my-5'>
          {item.quiz}
        </h2>

        <div className='flex flex-wrap gap-4'>
          {/* options 배열을 map으로 돌려서 옵션 표시 */}
          {options.map((option, index) => (
            <div
              key={option}
              onClick={() => handleOptionClick(index)}
              className={`w-[calc(50%-1rem)] h-24 rounded-lg text-brand-black bg-brand-bg2 text-center font-hakgyo text-hakgyo-l flex items-center justify-center cursor-pointer ${
                selectedIndex === index
                  ? isCorrect
                    ? 'bg-brand-primary3 text-white' // 정답일 때
                    : ' text-brand-primary3' // 오답일 때
                  : 'bg-brand-bg2'
              }`}
            >
              {isAnswered && selectedIndex === index && !isCorrect ? (
                <>
                  다시
                  <br />
                  골라볼까요?
                </>
              ) : (
                option
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 버튼을 고정하여 위치가 밀리지 않도록 처리 */}
      {isAnswered && isCorrect && (
        <div className='absolute bottom-12 left-1/2 transform -translate-x-1/2'>
          <Link href={`/gift/${item.location}`}>
            <Button className='mt-10'>보따리 열기</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
