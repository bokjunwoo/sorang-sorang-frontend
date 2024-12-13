'use client';

import { userStore } from '@/store/user';
import React from 'react';

export default function Name() {
  const userInfo = userStore((state) => state.name);

  return (
    <div className='absolute top-2 left-14 text-white font-pretendard text-center mb-2 font-bold'>
      {userInfo}
    </div>
  );
}
