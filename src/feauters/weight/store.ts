import type {Weight} from "@/feauters/weight/types.ts";
import {create} from "zustand";


interface WeightState {
    weights: Weight[];

    addWeight: (weight: Weight) => void;
}

export const useWeightStore = create<WeightState>((set) => ({
    weights: [],

    addWeight: (weight: Weight) => set((state) => ({weights: [...state.weights, weight]})),
}))
