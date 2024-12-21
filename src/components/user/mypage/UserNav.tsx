import React from 'react';
import GiftCount from './GiftCount';
import UserName from './UserName';

export default function UserNav() {
  return (
    <div className='relative flex items-center justify-between mt-6'>
      <UserName />

      <GiftCount />
    </div>
  );
}
