import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { useExplore } from '@/lib/api/user';

export default function QuizModal({ onClose }: { onClose: () => void }) {
  const { id } = useParams();
  const { data } = useExplore();

  const item = data?.find((item) => item.id === parseInt(id as string));

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!item) return null;

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index);
    if (index === item?.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsAnswered(true);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      {/* 모달 내용 */}
      <div className='bg-brand-bg1 px-6 py-10 rounded-lg w-96 mx-4 max-w-lg relative'>
        {/* X 버튼 */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-3xl text-brand-black font-bold'
        >
          x
        </button>

        <div className='flex justify-center mb-10'>
          <Image
            src={`/items/${item.region}.svg`}
            alt={'item.keyword'}
            width={112}
            height={112}
          />
        </div>

        <h2 className='text-brand-black font-hakgyo text-hakgyo-l text-center my-5'>
          {item.quiz}
        </h2>

        <div className='flex flex-wrap gap-4 justify-center'>
          {/* options 배열을 map으로 돌려서 옵션 표시 */}
          {item.options.map((option, index) => (
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
        <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2'>
          <Link href={`/gift/${item.region}`}>
            <Button>보따리 열기</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
