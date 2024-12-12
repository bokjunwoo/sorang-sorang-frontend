import {create} from "zustand";
import {MasterState} from "@/types/master";

export const masterStore = create<MasterState>((set) => ({
    masterInfo: {
        name: '',
        gender: '',
        region: '',
        keyword: '',
    },

    setMasterInfo: (newMasterInfo) => set((state) => ({
        masterInfo: { ...state.masterInfo, ...newMasterInfo }
    })),

    resetMasterInfo: () => set({
        masterInfo: {
            name: '',
            gender: '',
            region: '',
            keyword: '',
        }
    }),
}));