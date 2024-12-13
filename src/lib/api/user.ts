import { UserInfo } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import {exploreInfo, ExploreItem} from "@/lib/data/explore";

export const getExplore = async (): Promise<ExploreItem[]> => {
  try {
    return exploreInfo;
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
