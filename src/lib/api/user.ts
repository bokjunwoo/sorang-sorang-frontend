import { UserInfo } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const getExplore = async (): Promise<UserInfo[]> => {
  const response = await fetch('https://sorang.site/api/explore', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) throw new Error('데이터 로드 실패');
  return response.json();
};

export const useExplore = () => {
  return useQuery<UserInfo[], Error>({
    queryKey: ['explore'], // 쿼리 키
    queryFn: getExplore, // 데이터 요청 함수
    retry: false, // 실패 시 재시도 여부
  });
};
