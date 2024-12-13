import { quizzes } from '@/app/data/quzi';
import { Quiz } from '@/types/quiz';
import { useQuery } from '@tanstack/react-query';

// 퀴즈 데이터를 반환하는 함수, id가 일치하는 데이터만 반환
export const getQuziById = async (id: string): Promise<Quiz | undefined> => {
  try {
    return quizzes.find((item) => item.id.toString() === id); // id로 필터링하여 찾기
  } catch (error) {
    console.error('에러 발생:', error);
    throw new Error('목데이터 로드 실패');
  }
};

export const useQuzi = (id: string) => {
  return useQuery<Quiz | undefined, Error>({
    queryKey: ['quzi', id], // 쿼리 키에 id를 추가
    queryFn: () => getQuziById(id), // id를 함수에 전달
    retry: false, // 실패 시 재시도 여부
  });
};
