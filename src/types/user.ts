export type UserInfo = {
  id: number;
  location: string;
  name: string;
  gender: string;
  title: string;
  keyword: string;
  description: string;
  full_description: string;
};

export interface UserState {
  name: string;
  setName: (name: string) => void;
  resetName: () => void;
}