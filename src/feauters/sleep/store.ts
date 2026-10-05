import type {Sleep} from "@/feauters/sleep/types.ts";
import {create} from "zustand";


interface SleepState {
    sleeps: Sleep[];

    addSleep: (sleep: Sleep) => void;
}

export const useSleepStore = create<SleepState>((set) => ({
    sleeps: [],

    addSleep: (sleep: Sleep) => set((state) => ({sleeps: [...state.sleeps, sleep]})),
}))
