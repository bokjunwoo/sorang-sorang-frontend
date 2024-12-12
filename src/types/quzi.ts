type QuizOption = string;

// Quiz 타입
export interface Quiz {
  id: number; // 퀴즈 ID
  location: string;
  quiz: string; // 퀴즈 질문
  options: QuizOption[]; // 옵션 리스트
  answer: number; // 정답 번호 (1부터 4까지)
}
