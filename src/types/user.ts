export type UserInfo = {
  id: number;
  region: string;
  name: string;
  gender: string;
  title: string;
  keyword: string;
  description: string;
  fullDescription: string;
  quiz: string;
  options: string[];
  answer: number;
};

export interface UserState {
  name: string;
  setName: (name: string) => void;
  resetName: () => void;
}
