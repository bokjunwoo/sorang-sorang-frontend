export interface UserState {
  name: string;
  setName: (name: string) => void;
  resetName: () => void;
}