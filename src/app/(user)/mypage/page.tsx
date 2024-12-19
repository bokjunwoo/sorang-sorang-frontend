import React from 'react';
import QuestBadgeCollection from '@/components/user/mypage/QuestBadgeCollection';
import NewStoryNotification from '@/components/user/mypage/NewStoryNotification';
import GiftCount from '@/components/user/mypage/GiftCount';
import UserName from '@/components/user/mypage/UserName';

export default function page() {
  return (
    <div>
      {/* 상단 좌우 끝에 배치 */}
      <div className='flex justify-between items-center mx-5 mt-8'>
        {/* 좌측 부분: 이름 텍스트와 name 이미지 */}
        <div className='relative flex items-center justify-center'>
          {/* 이름 텍스트 (이미지 위에 절대 위치) */}
          <UserName />
        </div>
        {/* 우측 부분: 숫자 */}
        <GiftCount />
      </div>

      <NewStoryNotification />
      <QuestBadgeCollection />
    </div>
  );
}
