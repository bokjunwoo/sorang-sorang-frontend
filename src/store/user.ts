import { create } from 'zustand';
import { UserState } from '@/types/user';
import { persist } from "zustand/middleware";

export const userStore = create<UserState>()(
    persist(
        (set) => ({
            name: '',
            setName: (name: string) => set({ name }),
            resetName: () => set({ name: '' }),
        }),
        {
            name: 'user-storage',
        }
    )
);