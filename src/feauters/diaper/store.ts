import type {Diaper} from "@/feauters/diaper/types.ts";
import {create} from "zustand";


interface DiaperState {
    diapers: Diaper[];

    addDiaper: (diaper: Diaper) => void;
}

export const useDiaperStore = create<DiaperState>((set) => ({
    diapers: [],

    addDiaper: (diaper: Diaper) => set((state) => ({diapers: [...state.diapers, diaper]})),
}))