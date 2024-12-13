'use client';

import { Button } from '@/components/common/Button';
import React from 'react';

export default function StoryButton({ onClick }: { onClick: () => void }) {
  return <Button onClick={onClick}>이야기보따리 풀기</Button>;
}