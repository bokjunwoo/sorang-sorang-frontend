import { UserInfo } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const getExplore = async (): Promise<UserInfo[]> => {
  try {
    const response = await fetch('http://35.197.99.211:8080/api/explore');

    // 응답이 성공적이지 않으면 오류를 발생시킴
    if (!response.ok) {
      throw new Error('데이터를 가져오는 데 실패했습니다');
    }

    // JSON 데이터 반환
    const data: UserInfo[] = await response.json();

    return data;
  } catch (error) {
    console.error('에러 발생:', error);
    throw new Error('목데이터 로드 실패');
  }
};

export const useExplore = () => {
  return useQuery<UserInfo[], Error>({
    queryKey: ['explore'], // 쿼리 키
    queryFn: getExplore, // 데이터 요청 함수
    retry: false, // 실패 시 재시도 여부
  });
};
