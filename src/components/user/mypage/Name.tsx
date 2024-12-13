'use client';

import { userStore } from '@/store/user';
import React from 'react';

export default function Name() {
  const userInfo = userStore((state) => state.name);
  console.log('userStore state:', userStore.getState());

  return (
    <div className='absolute top-1/2 left-[63%] -translate-x-1/2 -translate-y-1/2 text-white font-pretendard text-center font-bold'>
      {userInfo}
    </div>
  );
}
