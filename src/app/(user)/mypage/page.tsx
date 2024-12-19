import React from 'react';
import Icon from '@/components/user/mypage/Icon';
import Image from 'next/image';
import New from '@/components/user/mypage/New';
import Count from '@/components/user/mypage/Count';
import Name from '@/components/user/mypage/Name';

export default function page() {
  return (
    <div>
      {/* 상단 좌우 끝에 배치 */}
      <div className='flex justify-between items-center mx-5 mt-8'>
        {/* 좌측 부분: 이름 텍스트와 name 이미지 */}
        <div className='relative flex items-center justify-center'>
          {/* 이름 텍스트 (이미지 위에 절대 위치) */}
          <Name />
        </div>

        {/* 우측 부분: 숫자 */}
        <Count />
      </div>

      <New />

      <Icon />
    </div>
  );
}
