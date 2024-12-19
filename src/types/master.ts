import {REGIONS} from "@/config/regions";

export interface MasterInfo {
    name: string;
    gender: '할머니' | '할아버지' | '';
    number: string;
    region: RegionType | '';
    keyword: string;
}

export type RegionType = typeof REGIONS[number];

export interface MasterState {
    masterInfo: MasterInfo;
    setMasterInfo: (newMasterInfo: Partial<MasterInfo>) => void;
    resetMasterInfo: () => void;
}

