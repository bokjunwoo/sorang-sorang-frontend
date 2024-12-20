import { create } from 'zustand';
import { StoryState } from '@/types/story';
import {persist} from "zustand/middleware";

export const useStoryStore = create<StoryState>()(
    persist(
        (set) => ({
            completedStories: [],

            addCompletedStory: (story) => set((state) => ({
                completedStories: [...state.completedStories, story]
            })),

            resetCompletedStories: () => set({
                completedStories: []
            }),
        }),
        {
            name: 'story-storage',
        }
    )
);