'use client';

import { userStore } from '@/store/user';
import React from 'react';
import Image from "next/image";

export default function Name() {
  const userInfo = userStore((state) => state.name);

  return (
      <div className="relative flex items-center">
          {/* 아바타 - 배경 박스보다 위에 위치 */}
          <div className="relative z-10 w-8 h-8 rounded-full bg-white overflow-hidden flex items-center justify-center">
              <Image
                  src="/avatar.svg"
                  alt="아바타"
                  width={24}
                  height={24}
                  className="object-cover"
              />
          </div>
          {/* 배경 박스 - 아바타의 절반 정도를 덮도록 위치 */}
          <div className="absolute left-3.5 flex items-center bg-black/50 rounded-full py-0.5 pr-4 pl-7">
        <span className="text-white text-pretendard-s font-pretendard font-bold whitespace-nowrap">
          {userInfo}
        </span>
          </div>
      </div>
  );
}
