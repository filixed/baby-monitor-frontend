import type {Baby} from "@/feauters/baby/types.ts";
import {create} from "zustand";


interface BabyState {
    babies: Baby[];

    addBaby: (baby: Baby) => void;
}

// Temporary seed until there is a form to add a baby.
const seedBaby: Baby = {
    id: crypto.randomUUID(),
    name: "Emma",
    dateOfBirth: "2026-09-24",
};

export const useBabyStore = create<BabyState>((set) => ({
    babies: [seedBaby],

    addBaby: (baby: Baby) => set((state) => ({babies: [...state.babies, baby]})),
}))
