'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function New() {
  const [value, setValue] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem('new');
    if (stored) {
      setValue(JSON.parse(stored));
    }
  }, []);

  return (
    <div className='flex justify-center mt-12'>
      {value && (
        <Link href={'/story/1'}>
          <div className='font-hakgyo text-hakgyo-l text-brand-black bg-white p-4 rounded-2xl'>
            <div>이순자 할머니의</div>
            <div>새로운 이야기가 도착했어요!</div>
          </div>
        </Link>
      )}

      <div style={{ opacity: !value ? '0' : 'block' }}>
        <Link href={'/story/1'}>
          <div className='font-hakgyo text-hakgyo-l text-brand-black bg-white p-4 rounded-2xl'>
            <div>이순자 할머니의</div>
            <div>새로운 이야기가 도착했어요!</div>
          </div>
        </Link>
      </div>

      <Link href={'/explore'}>
        <Image src={'/pocket.svg'} alt={'보따리열기'} width={80} height={80} />
      </Link>
    </div>
  );
}
