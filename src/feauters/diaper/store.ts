import type {Diaper} from "@/feauters/diaper/types.ts";
import {create} from "zustand";


interface DiaperState {
    diapers: Diaper[];

    AddDiaper: (diaper: Diaper) => void;
}

export const useDiaperStore = create<DiaperState>((set) => ({
    diapers: [],

    AddDiaper: (diaper: Diaper) => set((state) => ({diapers: [...state.diapers, diaper]})),
}))