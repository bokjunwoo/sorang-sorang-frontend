import React from 'react';
import QuestBadgeCollection from '@/components/user/mypage/QuestBadgeCollection';
import NewStoryNotification from '@/components/user/mypage/NewStoryNotification';
import UserNav from '@/components/user/mypage/UserNav';

export default function page() {
  return (
    <div className='flex flex-col'>
      <UserNav />

      <NewStoryNotification />

      <QuestBadgeCollection />
    </div>
  );
}
