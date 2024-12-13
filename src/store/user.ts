import { create } from 'zustand';
import { UserState } from '@/types/user';

export const userStore = create<UserState>((set) => ({
    name: '',
    setName: (name: string) => set({ name }),
    resetName: () => set({ name: '' }),
}));